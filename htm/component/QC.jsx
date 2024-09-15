'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Option from './Option';
import axios from 'axios';
import { stringify } from 'postcss';

const QC = ({ imageSrc, ans, index, shift }) => {
  const [textAnswer, setTextAnswer] = useState(''); // State for the text input
  console.log(ans);
  console.log("hi");
  


  return (
    <div className="mt-5 w-fit px-10 h-fit py-10 flex flex-col justify-center">
      <Image src={imageSrc} width={850} height={550} alt="Question image" />
      {ans.slice(0, 1) === 'I' ? (
        <>
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            className="border p-2 rounded-md mt-4"
          />
          <button
            onClick={()=>{
 
              if(ans==='I'+stringify(textAnswer)){
                alert("ha")
              }else{
                alert("na");
              }
            }}
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
