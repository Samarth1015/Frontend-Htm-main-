"use client"; // This should be the first line to indicate a client component
import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Loader2 } from "lucide-react"; // Use a loader icon from Lucide
import User from "@/lib/Model/user";
import Option from "../../../component/Option";
import dbConnect from "@/lib/db";
import { app } from "../../../context/firebaseConfig";

export default function Quest() {
  const auth = getAuth(app);
  const user = auth.currentUser;
  console.log("--->", user?.email);

  let [flag, setFlag] = useState(false);
  const [integerAnswer, setIntegerAnswer] = useState("1");
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [arr, setArr] = useState([]); // Questions array
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question index

  // Fetching data from API
  useEffect(() => {
    async function fetchQuestions() {
      try {
        let result = await axios.get(
          "http://127.0.0.1:5000/get-questions?examType=jee"
        );

        // Access the data from the response
        setArr(result.data); // Assuming you want to set this data to arr
      } catch (error) {
        console.error("Error fetching questions:", error); // Proper error handling
      }
    }

    fetchQuestions(); // Call the async function
  }, []); // Empty dependency array to run once when the component mounts

  // Access questions from arr, use optional chaining to prevent errors if undefined
  const questions = arr?.questions || []; // Ensure questions is an array

  // Handler function for integer answer check
  const checkInteger = (num, ans) => {
    if (ans === "I" + num) {
      setAttempted(true);
      setCorrectAnswer(true);
      setTimeout(() => {
        moveToNextQuestion(); // Move to the next question after a correct answer
      }, 1000); // Move to the next question after a 1-second delay
    } else {
      setAttempted(true);
      setCorrectAnswer(false);
    }
  };

  // Function to move to the next question
  const moveToNextQuestion = () => {
    setAttempted(false);
    setCorrectAnswer(false);
    setIntegerAnswer("1");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Go to next question
    } else {
      alert("You have completed all the questions!"); // Handle end of quiz
    }
  };

  return (
    <div className="mt-80">
      <div>
        {questions.length > 0 ? (
          <div key={currentQuestionIndex} className="mt-14 bg-white p-2">
            {/* Set white background and padding */}
            <div>
              <img
                src={questions[currentQuestionIndex]}
                alt={`Question ${currentQuestionIndex + 1}`}
                className="h-48 object-contain" // Fixed size for all images
              />
            </div>
            {/* Check if the current question is an integer type */}
            {arr?.solutions[currentQuestionIndex]?.slice(0, 1) === "I" ? (
              <>
                <input
                  type="number"
                  value={integerAnswer}
                  onChange={(e) => setIntegerAnswer(e.target.value)}
                  className={` bg-transparent py-2 ml-5 placeholder:text-black rounded-md border-2 ${
                    attempted
                      ? correctAnswer
                        ? "border-green-500"
                        : "border-red-500"
                      : "border-blue-500"
                  } text-black font-bold px-4`}
                  placeholder="Enter Integer"
                />
                <button
                  onClick={() =>
                    checkInteger(
                      integerAnswer,
                      arr.solutions[currentQuestionIndex]
                    )
                  }
                  className={`${
                    attempted
                      ? correctAnswer
                        ? "bg-green-500"
                        : "bg-red-500"
                      : "bg-blue-500"
                  } px-10 py-2 rounded-md text-white active:scale-95 transition-all duration-100 w-32 self-center`}
                >
                  Submit
                </button>
              </>
            ) : (
              <div>
                <Option ans={arr.solutions[currentQuestionIndex]} />
              </div>
            )}
          </div>
        ) : (
          <div className="w-screen flex justify-center">
            <Loader2 className="animate-spin text-blue-600 w-12 h-12 align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
