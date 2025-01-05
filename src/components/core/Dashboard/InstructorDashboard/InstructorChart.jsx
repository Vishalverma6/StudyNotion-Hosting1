import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

const InstructorChart = ({courses}) => {
    const [currChart, setCurrChart] = useState("students")

    // function to generate random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)},
             ${Math.floor(Math.random()*256)})`;
             colors.push(color);
        }
        return colors;
        
    }

    // create data for chart displaying student info

    const ChartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data:courses.map((course)=> course.totalStudentsEnrollrd),
                backgroundColor: getRandomColors(courses.length),
            }
        ]

    }

    // create data for chart dipslaying income info
    const chartDataForIncome= {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                data:courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    // create options
    const options ={

    };

  return (
    <div className= 'flex flex-wrap flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6'>
       <p className="text-lg font-bold text-richblack-5">Visualise</p>
       <div className={`flex gap-4 font-semibold `}>
          <button 
            onClick={() => setCurrChart("students")}
             className= {`rounded-sm p-1 px-3 transition-all duration-200 ${
                currChart === "students"
                ? " bg-richblack-600 text-yellow-50"
                : "text-yellow-50"
             }`}
            >
             Student
          </button>
          <button 
           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
            ? "bg-richblack-600 text-yellow-50"
            : "text-yellow-400"
           }`}
           onClick={() => setCurrChart("income")}
          >
             Income
          </button>
       </div>
       <div className=' relative mx-auto  aspect-square object-cover h-full  w-full'>
          <Pie
          
             data={currChart === "students" ? ChartDataForStudents : chartDataForIncome}
             options={options}
          />
       </div>
    </div>
  )
}

export default InstructorChart
