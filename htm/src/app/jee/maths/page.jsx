'use client';
import { useState } from 'react';
import axios from 'axios';
import Uploadfile from '../../../../component/UploadFile';
import Image from 'next/image';

export default function SendParagraph() {
  const [paragraph, setParagraph] = useState('');
  const [response, setResponse] = useState({ ans: [], quetion_Image: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { paragraph: paragraph };
      const res = await axios.post('http://127.0.0.1:5000/Jee_Maths', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResponse(res.data.result || {});
    } catch (error) {
      console.error('Error sending paragraph:', error);
      setResponse({ ans: [], quetion_Image: [] });
    }
  };

  return (
    <div className='flex flex-col justify-center'>
      <Uploadfile subj={"Jm"}  />
      <h1 className='self-center'>Send Paragraph</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center '>
        <textarea
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          rows="10"
          cols="50"
          className="text-white self-center mt-10"
          placeholder="Enter your paragraph here..."
        />
        <br />
        <button type="submit" className='bg-blue-500 px-10 py-5 rounded-lg active:scale-95 w-fit self-center text-white mb-10'>Send</button>
      </form>

      {response.ans.length > 0 && (
        <div>
          <h2>Answers:</h2>
          {response.ans.map((ans, index) => (
            <p key={index}>{ans}</p>
          ))}
        </div>
      )}

      {response.quetion_Image.length > 0 && (
        <div>
          {response.quetion_Image.map((imgSrc, index) => (
            <Image
              key={index}
              src={imgSrc}
              alt={`Image ${index}`}
              width={850}
              height={550}
              className='mt-10'
            />
          ))}
        </div>
      )}
    </div>
  );
}
