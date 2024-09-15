"use client";

import axios from "axios";
import { Question } from "../context/number";
import React, { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../context/firebaseConfig";

const auth = getAuth(app);

const Option = ({ ans, question, shift }) => {
  let data = useContext(Question);


  const [selectedOption, setSelectedOption] = useState(null); // To track the selected option
  const [isCorrect, setIsCorrect] = useState(null); // To track if the answer is correct or not
  const [user, setUser] = useState(null); // State to store the authenticated user

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user when they are authenticated
      } else {
        setUser(null); // Handle unauthenticated state
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const checkAnswer = async (index) => {
    setSelectedOption(index);
    if (index === parseInt(ans)) {
      setIsCorrect(true);

      console.log("Answer correct");
      setTimeout(() => {
        shift(question + 1);
        setSelectedOption(null)
      }, 700);
      await axios.post("/api/right", { email: user.email });
    } else {
      setIsCorrect(false);
      if (user) {
        // Send the attempt information to the backend
        await axios.post("/api/attempt", { email: user.email });
      }
    }
  };

  const getOptionStyle = (index) => {
    if (selectedOption === null) return "border-blue-500 text-blue-500";
    if (index === selectedOption) {
      return isCorrect
        ? "border-green-500 bg-green-500 text-blue"
        : "border-red-500 bg-red-500 text-blue";
    }
    return "border-blue-500 text-blue-500";
  };

  return (
    <div className="flex flex-row  px-4 w-full gap-4 mt-2 h-fit">
     <div className="flex flex-row justify-between px-4">
       <div className="flex flex-row gap-4">
     {["A", "B", "C", "D"].map((label, idx) => (
      <>
       <div
          key={label}
          onClick={() => checkAnswer(idx + 1)}
          className={`border-2 px-10 py-2 self-center active:scale-95 duration-100 transition-all rounded-lg bg-transparent text-center font-bold ${getOptionStyle(
            idx + 1
          )}`}
        >
          {label}
       </div>
      </>
      ))}
      </div>
      <div className="bg-blue-500 active:scale-95 duration-100 transition-all ml-10 self-end px-10 py-5 w-fit">Show Answer</div>
     </div>
    </div>
  );
};

export default Option;
