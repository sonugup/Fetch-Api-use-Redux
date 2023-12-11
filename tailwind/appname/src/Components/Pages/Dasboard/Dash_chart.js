// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';

// const LineChart = () => {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('YOUR_API_ENDPOINT'); // Replace with your API endpoint
//         const data = response.data;

//         // Assuming your API returns an array of objects with 'x' and 'y' properties
//         const chartLabels = data.map(item => item.x);
//         const chartValues = data.map(item => item.y);

//         setChartData({
//           labels: chartLabels,
//           datasets: [
//             {
//               label: 'My Chart',
//               data: chartValues,
//               fill: false,
//               borderColor: 'rgb(75, 192, 192)',
//               tension: 0.1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to run the effect only once on component mount

//   return (
//     <div>
//       <h2>Line Chart</h2>
//       <Line data={chartData} />
//     </div>
//   );
// };

// export default LineChart;
import React from 'react'
import { Chart } from "chart.js/auto"
import { Line } from 'react-chartjs-2'


const LineChart = () => {
  // const labels = ["January", "February", "March", "April", "May", "June"];

  const labels = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor:"rgb(45, 247, 153, 0.5)",
        // borderColor: "#00ff2a",
        data: [10, 1, 30, 14, 20, 36, 32, 25, 40,0],
        // 0, 10, 5, 2, 20, 30, 45
        fill:true,
      },
      {
        label: "Second dataset",
        data: [5, 5, 5, 20, 9, 30, 14, 25, 15, 20],
        fill: true,
        backgroundColor: "rgb(158, 110, 5, 0.5)",
        // borderColor: "rgb(255,99,132)",
      }
    ],  
  };
  return (
    <div className='bg-white rounded-3xl '>
      <Line data={data}></Line>
    </div>
  )
}

export default LineChart;


