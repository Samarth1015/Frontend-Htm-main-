'use client'
import Image from 'next/image';
import { useState } from 'react';
import QuestionComp from '../../../../component/QuestionComp';

export default function Home() {
  const [paragraph, setParagraph] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setParagraph(e.target.value);
  };

  const handleSubmit = async (e) => {
 
    e.preventDefault();
  
    console.log("Submitting paragraph:", paragraph);
  
    // Send the paragraph to the Flask backend
    try {
      const response = await fetch('http://127.0.0.1:5000/Jee_Chemistry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: paragraph }),
      });
  
      console.log("Response received:", response);
  
      const data = await response.json();
      console.log("Parsed JSON data:", data);
  
      if (data.suggestions) {
        setSuggestions(data.suggestions);
        console.log(suggestions);
        
        setMessage('');
      } else {
        setSuggestions([]);

        setMessage(data.message || 'No related data found');
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setMessage('An error occurred while fetching suggestions.');
    }
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Text Suggestions</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <textarea
          value={paragraph}
          onChange={handleInputChange}
          placeholder="Enter a paragraph..."
          rows={6}

          className='text-white mt-7'
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          required
        />
        <button type="submit" className='self-center text-white bg-blue-500 px-8 py-4 rounded-xl' style={{ marginTop: '10px', padding: '10px 20px' }}>
          Get Suggestions
        </button>
      </form>

      {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}

      {suggestions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
         
          <ul>
            {suggestions.map((suggestion, index) => (
              <>
              <li key={index} style={{ marginBottom: '10px' }}>
                {suggestion.image && (
                  <div>
                    <strong>Quesition : {index+1}</strong>
                    <Image src={suggestion.image} alt="Related" width={850} height={500} />
                    {/* <QuestionComp src={suggestion.image}  index={index} ans={suggestion.ans[index]}/> */}
                
                  </div>
                )}
              </li>
              <li>
              </li>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
