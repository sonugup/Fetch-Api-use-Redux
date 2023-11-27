// import React, { useState } from "react";

// function Test() {
//   const [phone, setPhone] = useState("");
//   const [responseData, setResponseData] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ phone: phone })
//     };

//     fetch('https://chimpu.xyz/api/post.php', requestOptions)
//       .then(response => {
//         setResponseData(response.headers.get("data"));
//         console.log(response.headers.get)
//       })
//       .catch(error => console.log(error));
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Phone number:
//           <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//       {responseData && (
//         <div>
//           <h2>Response data:</h2>
//           <p>{responseData}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Test;

import React, { useState } from 'react';
import axios from 'axios';

const ApiPostComponent = () => {
  const [responseData, setResponseData] = useState(null);

  const postData = async () => {
    const endpoint = 'https://chimpu.xyz/api/post.php';
    const phoneNumber = '1234567890'; // Replace with the desired phone number

    try {
      const response = await axios.post(endpoint, {
        phoneNumber: phoneNumber,
      });
      
      // Access the headers from the response object
      const headers = response.headers;
      setResponseData(headers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={postData}>Post Data</button>
      <pre>{JSON.stringify(responseData, null, 2)}</pre>
    </div>
  );
};

export default ApiPostComponent;