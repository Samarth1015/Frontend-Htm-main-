"use client";

import { Question } from "../context/number";
import React, { useContext, useEffect, useState } from "react";

const Option = ({ ans }) => {
  let data = useContext(Question);
  console.log(data);

  let [user, setUser] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // To track the selected option
  const [isCorrect, setIsCorrect] = useState(null); // To track if the answer is correct or not

  const checkAnswer = (index) => {
    setSelectedOption(index);
    if (index === parseInt(ans)) {
      setIsCorrect(true);
      data.setData((prev) => {
        let right = prev.right + 1;
        let total = prev.wrong + prev.right;
        return { ...prev, right, total };
      });
      console.log("answer correct ");
    } else {
      setIsCorrect(false);
      data.setData((prev) => {
        let wrong = prev.wrong + 1;
        let total = prev.wrong + prev.right;
        return { ...prev, wrong };
      });
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
    <div className="flex flex-row justify-start px-4 w-full gap-4 mt-2 h-fit">
      {["A", "B", "C", "D"].map((label, idx) => (
        <div
          key={label}
          onClick={() => checkAnswer(idx + 1)}
          className={`border-2 px-10 py-2 active:scale-95 duration-100 transition-all rounded-lg bg-transparent text-center font-bold ${getOptionStyle(
            idx + 1
          )}`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default Option;
