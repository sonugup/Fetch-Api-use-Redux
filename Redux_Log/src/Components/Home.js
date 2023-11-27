import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Style/home.css";
import { FaGraduationCap } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GiStarKey } from "react-icons/gi";
import { FaUsersSlash } from "react-icons/fa";
import { BiCircle } from "react-icons/bi";
import PieChart from "./Pages/PieChart";


const Home = () => {
  const [data, setData] = useState([])
  const [curPage, setCurPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = curPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);
  console.log(records);

  const prePage = () => {
    if (curPage !== firstIndex) {
      setCurPage(curPage - 1);
    }
  };
  const changePage = (id) => {
    setCurPage(id);
  };
  const nextPage = () => {
    if (curPage !== lastIndex) {
      setCurPage(curPage + 1);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/api/get`)
      .then(res => setData(res.data))
      .catch(error => console.log(error))
  }, [])
  console.log(data)
  return (
    <div className="contan">
      <div className="box">
        <div className="navbox">
          <div>
            <div className="divbox1">
              <Link className="link1" to={"/student"}>
                <h5>Total Student</h5>
                <h4>224</h4>
              </Link>
              <FaGraduationCap />
            </div>
          </div>
          <div>
            <div className="divbox2">
              <Link className="link1" to={"/questions"}>
                <h5>Total Questions</h5>
                <h4>228</h4>
              </Link>
              <AiOutlineQuestionCircle />
            </div>
          </div>
          <div>
            <div className="divbox3">
              <Link className="link1" to={"/quizs"}>
                <h5>Quiz Avilable</h5>
                <h4>224</h4>
              </Link>
              <GiStarKey />
            </div>
          </div>
          <div>
            <div className="divbox4">
              <Link className="link1" to={"/student"}>
                <h5>Total Users</h5>
                <h4>224</h4>
              </Link>
              <FaUsersSlash />
            </div>
          </div>
        </div>
        <div className="cont">
          <div className="secbox">
            <div className="recen">
              <p>Recently Registered Students</p>
              <hr />
              <BiCircle />
              <hr />
            </div>
            <div className="inbox">
              <div className="topof">
                <div>
                  <p>
                    Show
                    <select>
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                    </select>
                    entries
                  </p>
                </div>
                <div>
                  <span>
                    Search <input type="text" />
                  </span>
                </div>
              </div>
              <div className="inboxin">

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">EMAI</th>
                      <th scope="col">FULL NAME</th>
                      <th scope="col">CONTAICT NUMBER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((d, i) => {
                      return (
                        <tr key={i} className="inboxin">
                          <td>{d.email}</td>
                          <td>{d.name}</td>
                          <td>{d.contact}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <nav>
                  <ul className="pagination">
                    <li className="page-item">
                      <button className="page-link" onClick={prePage}>
                        prev
                      </button>
                    </li>
                    {number.map((n, i) => {
                      return (
                        <li
                          className={`page-item ${curPage === n ? 'activ' : ''
                            }`}
                          key={i}
                        >
                          <button
                            className="page-item"
                            onClick={() => changePage(n)}
                          >
                            {n}
                          </button>
                        </li>
                      );
                    })}
                    <li className="page-item">
                      <button className="page-link" onClick={nextPage}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="secbox">

            <p>Revenue nan% from last month</p>
            <PieChart />
          </div>
        </div>
      </div>
      Hi student
    </div>
  );
};



// const ChartData=() => {
//    const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Order this year',
//       },
//     },
//   };

//   const labels = ['2000', '2002', '2004', '2006', '2008', '2010', '2012'];
//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//         borderColor: 'rgb(255, 99, 132)',
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       },
//       {
//         label: 'Dataset 2',
//         data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//         borderColor: 'rgb(53, 162, 235)',
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       },
//     ],
//   };
//   return (
//     <div>
//       <Line options={options} data={data} />;
//     </div>
//   )


// }


export default Home;