


import React, { useState } from 'react';
import axios from 'axios';

const ApiRequestComponent = () => {
  const [body, setBody] = useState({});
  const [headers, setHeaders] = useState({});

  const postData = async () => {
    try {
      const response = await axios.post('https://chimpu.xyz/api/post.php', {
        phonenumber: '1234567890', 
      });
      setHeaders(response.headers);
      setBody(response.data);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={postData}>Send API Request</button>
      <div>
        <h3>Response body:</h3>
        <ul>
          {Object.entries(body).map(([key, value]) => (
            <p key={key}>
              {/* {key}: */}
               {value}
            </p>
          ))}
        </ul>
        <h3>Response Headers:</h3>
        <ul>
          {Object.entries(headers).map(([key, value]) => (
            <p key={key}>
              {/* {key}: */}
               {value}
            </p>
          ))}
        </ul>
        
      </div>
    </div>
  );
};

export default ApiRequestComponent;


