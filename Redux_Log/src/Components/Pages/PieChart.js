import React from 'react'
import {Chart} from "chart.js/auto"
import {Line} from 'react-chartjs-2'


const PieChart = () => {
    // const labels = ["January", "February", "March", "April", "May", "June"];

    const labels = [2004, 2005, 2006, 2007, 2008, 2009, 2010];
    const data={
        labels:labels,
        datasets:[
            {
                label:"My First dataset",
                backgroundColor:"rgb(255,99,132)",
                borderColor:"rgb(255,99,132)",
                data:[0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };
  return (
    <div className='bg-white '>
      <p>$ 0.00 this year</p>
      <Line data={data}></Line>
    </div>
  )
}

export default PieChart
