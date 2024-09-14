"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import QuestionComp from "../../../component/QuestionComp";

const Page = () => {
  const [res, setRes] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/get-questions?examType=jee"
      );
      setRes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Runs only once on component mount


  return (
    <div className="h-fit py-10 w-full mt-10 bg-transparent flex flex-col">
      {res.questions &&
        res.questions.map((src, index) => (
          <>
            <div className="self-center flex flex-col h-fit w-fit">
            <QuestionComp
                  src={src}
                  index={index + 1}
                  ans={res.solutions[index]}
                  flag={res.solutions[index].slice(0, 1) === "I" ? false : true} // Check the first character of the answer
                />
            </div>
            <br />
          </>
        ))}
    </div>
  );
};

export default Page;
