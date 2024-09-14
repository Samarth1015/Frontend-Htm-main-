import Image from 'next/image';
import React, { useState } from 'react';
import Option from './Option';
import axios from 'axios';

const QC = ({ imageSrc, ans, index, shift }) => {
  const [textAnswer, setTextAnswer] = useState(''); // State for the text input

  // Function to handle the text answer submission
  const handleTextSubmit = async () => {
    try {
      await axios.post("/api/text-answer", { answer: textAnswer });
      console.log('Text answer submitted');
      shift(index + 1); // Move to the next question
    } catch (error) {
      console.error('Error submitting text answer:', error);
    }
  };

  return (
    <div className="mt-5 w-fit px-10 h-fit py-10 flex flex-col justify-center">
      <Image src={imageSrc} width={850} height={550} alt="Question image" />
      {ans.slice(0, 1) === "I" ? (
        <>
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            className="border p-2 rounded-md mt-4"
          />
          <button
            onClick={handleTextSubmit}
            className="bg-blue-500 text-white p-2 rounded-md mt-2"
          >
            Submit
          </button>
        </>
      ) : (
        <Option ans={ans} question={index} shift={shift} />
      )}
    </div>
  );
};

export default QC;
