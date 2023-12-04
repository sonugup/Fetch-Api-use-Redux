import React from "react";
// import Navbar from "../Header/Navbar";
// import Footer from "../Footer/Footer";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
const initialValues = {
  financial_year: "",
  pan: "",
  filing_category: "",
  residential_status: "",
  basic_salary: "",
  hra_received: null,
  rent_paid: null,
  other_allowances: null,
  address: {
    city: "",
  },
  interest_paid_on_let_out_hp_loan: null,
  rent_received: null,
  property_tax_paid: null,
  interest_paid_on_self_occupied_hp_loan: null,
  capital_gains_by_quarter: [
    ["stcg_15", "stcg_30", "stcg_slab", "ltcg_10", "ltcg_20"],
    ["150000", 0, 0, "-15000", 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  savings_interest: null,
  fd_interest: null,
  dividend_income: null,
  other_income: null,
  regular_business_turnover: null,
  regular_business_profit: null,
  speculative_business_turnover: null,
  speculative_business_profit: null,
  elss: "",
  tax_credits: [
    ["type", "date_of_deposit", "amount"],
    ["TDS", "01/04/2020", null],
    ["TCS", "01/04/2020", null],
    ["Advance Tax", "15/06/2020", 35000],
  ],
};
// sum function
const calculateSum = (obj) => {
  let sum = 0;
  for (let key in obj) {
    sum += Number(obj[key]);
  }
  return sum;
};
export default function AdvanceTaxCalc() {
  const [select, setSelect] = useState("");
  const [secetion115Bac, setSection115Bac] = useState("no");
  const [showHide1, setShowHide1] = useState(false);
  const [showHide2, setShowHide2] = useState(false);
  const [showHide3, setShowHide3] = useState(false);
  const [showHide4, setShowHide4] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  const [calculatedTax, setCalculatedTax] = useState({});
  const [isLetoutSelected, setIsLetoutSelected] = useState(false)
  // unchecked letout interest state 
  const [uncheckedLetoutAmount, setUncheckedoutAmount] = useState(0);
  // checked letout interest
  const [checkedLetoutAmount, setCheckedoutAmount] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: ""
  });
  // income from other sources state 
  const [incomeFromOtherSource, setIncomeFromOtherSource] = useState({
    value1: "",
    value2: "",
    value3: ""
  })
  // DEDUCTION STATE  part one1
  const [deductions, setDeductions] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
    value7: "",
    value8: "",
    value9: "",
    value10: "",
    value11: "",
    value12: "",
    value13: "",


  });
  // deduction state part 2 
  const [deductions2, setDeductions2] = useState({
    value14: "",
    value15: "",
    value16: "",
    value17: "",
    value18: "",
    value19: "",
    value20: "",
    value21: "",
    value22: "",

  });
  // nps ammount state 
  const [npsAmount, setNpsAmount] = useState({
    value1: '',
    value2: ""
  })

  // 80DD amount check state 
  const [amount80DD, setAmount80DD] = useState(0);
  // 80U amount check state
  const [amount80U, setAmount80U] = useState(0);
  // severe disability check 1
  const [severe_disabilityCheck1, setsevere_DisabilityCheck1] = useState(false)
  // severe disability check 1
  const [severe_disabilityCheck2, setsevere_DisabilityCheck2] = useState(false)

  // stcg and ltcg states 
  const [stcg1, setStcg1] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    vlaue5: 0,
  });
  const [stcg2, setStcg2] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    vlaue5: 0,
  });
  const [ltcg1, setLtcg1] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    vlaue5: 0,
  });
  const [ltcg2, setLtcg2] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    vlaue5: 0,
  });
  const [ltcg3, setLtcg3] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    vlaue5: 0,
  });


  // NET ANNUAL INCOME CONSTANT 
  const NET_ANNUAL_INCOME = (checkedLetoutAmount.value1 - (checkedLetoutAmount.value2 + checkedLetoutAmount.value3))
  // STANDAR DETUCTION OF 30% CONSTANT 
  const STANDARD_DETUCTION = (NET_ANNUAL_INCOME && (Math.floor((NET_ANNUAL_INCOME * 30) / 100)))

  // LET OUT INCOME CONSTANT 
  const LET_OUT_INCOME = (NET_ANNUAL_INCOME - (STANDARD_DETUCTION + checkedLetoutAmount.value4));
  // income from house property constant
  let INCOME_FROM_HOUSE_PROERTY = uncheckedLetoutAmount > 0 ? uncheckedLetoutAmount : LET_OUT_INCOME;

  // total of duduction part one 
  const TOTAL_DEDUCTION_PART1 = calculateSum(npsAmount) + (calculateSum(deductions) > 150000 ? 150000 : calculateSum(deductions));

  // Deduction part two calulation 
  const TOTAL_DEDUCTION = (TOTAL_DEDUCTION_PART1 + amount80DD + amount80U + calculateSum(deductions2))
  //Total of Capital gains 
  const TOTAL_CAPITAL_GAINS = (calculateSum(stcg1) + calculateSum(stcg2) + calculateSum(ltcg1) + calculateSum(ltcg2) + calculateSum(ltcg3))
  console.log("total deduction amound calulate", TOTAL_DEDUCTION_PART1)

  // console.log("income from house property" , INCOME_FROM_HOUSE_PROERTY);

  const getuncheckedLetoutAmountHandler = (e) => {
    setUncheckedoutAmount(e.target.value)


  }


  const getCheckedLetoutAmountHandler = (e) => {
    INCOME_FROM_HOUSE_PROERTY = 0
    let { name, value } = e.target;
    setCheckedoutAmount({ ...checkedLetoutAmount, [name]: Number(value) })
  }
  // income  from other source handler 
  const incomeFromOtherSourceHandler = (e) => {
    let { value, name } = e.target;
    setIncomeFromOtherSource({ ...incomeFromOtherSource, [name]: Number(value) })
  }

  // stcg handlers
  const stcgOneHandler = (e) => {
    let { value, name } = e.target;
    // console.log(e.target.value)
    setStcg1({ ...stcg1, [name]: value });
  };
  const stcgTwoHandler = (e) => {
    let { value, name } = e.target;
    // console.log(e.target.value)
    setStcg2({ ...stcg2, [name]: value });
  };

  // ltcg handlers

  const ltcgOneHandler = (e) => {
    let { name, value } = e.target;
    setLtcg1({ ...ltcg1, [name]: value });
  };
  const ltcgTwoHandler = (e) => {
    let { name, value } = e.target;
    setLtcg2({ ...ltcg2, [name]: value });
  };
  const ltcgThreeHandler = (e) => {
    let { name, value } = e.target;
    setLtcg3({ ...ltcg3, [name]: value });
  };



  // interest check handler for let out property or not 
  const checkInterest = (e) => {
    if (e.target.checked) {
      setIsLetoutSelected(true)
      setUncheckedoutAmount(0)
    }
    else {
      setIsLetoutSelected(false)
      setCheckedoutAmount({
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0
      })
    }
  }

  // deduction amound handler 
  const deductionAmountHandler = (e) => {
    let { name, value } = e.target;
    setDeductions({ ...deductions, [name]: Number(value) })
  }
  // deduction amound handler 
  const deductionAmountHandler2 = (e) => {
    let { name, value } = e.target;
    setDeductions2({ ...deductions2, [name]: Number(value) })
  }

  // nps amount handler 
  const npsAmountHandler = (e) => {
    let { name, value } = e.target;
    setNpsAmount({ ...npsAmount, [name]: Number(value) })
  }

  // amound80DD handler 
  const amount80DDHanlder = (e) => {
    if (e.target.checked && severe_disabilityCheck1) {
      setAmount80DD(125000)
    }
    else if (e.target.checked) {
      setAmount80DD(75000)
    }
    else {
      setAmount80DD(0)
    }

  }
  // amound80U handler 
  const amount80UHanlder = (e) => {
    if (e.target.checked && severe_disabilityCheck2) {
      setAmount80U(125000)
    }
    else if (e.target.checked) {
      setAmount80U(75000)
    }
    else {
      setAmount80U(0)
    }

  }

  // severe_disabilityCheck1 handler 
  const severe_disabilityCheck1Handler = (e) => {
    if (e.target.checked && amount80DD) {
      setsevere_DisabilityCheck1(true);
      setAmount80DD(125000)
    }
    else if (!e.target.checked && amount80DD) {
      setsevere_DisabilityCheck1(false)
      setAmount80DD(75000)
    }
    else {
      setsevere_DisabilityCheck1(false)
      setAmount80DD(0)
    }
  }

  // severe_disabilityCheck2 handler 
  const severe_disabilityCheck2Handler = (e) => {
    if (e.target.checked && amount80U) {
      setsevere_DisabilityCheck2(true);
      setAmount80U(125000)
    }
    else if (!e.target.checked && amount80U) {
      setsevere_DisabilityCheck2(false)
      setAmount80U(75000)
    }
    else {
      setsevere_DisabilityCheck2(false)
      setAmount80DD(0)
    }
  }

  // console.log("income from other source" , incomeFromOtherSource)

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      filing_category: select,
      pan: panNumber,
    },
    enableReinitialize: true,
    validate: (values) => {
      let errors = {};
      let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      if (!regex.test(values.pan)) {
        errors.pan = "Invalid pan number";
      }
      return errors;
    },
    onSubmit: (values) => {
      //  calulateAdvanceTaxHandler(values)
      axios
        .post(
          "https://mom.itaxeasy.com/api/calculator/advance-income-tax/old-regime",
          values
        )
        .then((res) => {
          console.log("calculated tax", res.data);
        })
        .catch((err) => {
          console.log("error while making request", err.message);
        });
    },
  });
  console.log("deduction amound part1", deductions);
  console.log("deduction amound part2", deductions2);
  console.log("nps amount", npsAmount);
  console.log("80dd amount", amount80DD)
  console.log("80U amount", amount80U)

  console.log("form values", formik.values);
  // console.log("formik error" , formik.errors);
  return (
    <>
      {/* <Navbar /> */}
      <div className="bgblack">
        <div className="container" style={{
          paddingTop: "6rem",
        }}>
          <div className="card" style={{ borderRadius: "2rem" }}>
            <div
              id="advancetaxdiv"
              className="card-body  p-3 mb-auto"

            >
              <h3 className="line mb-5">
                ADVANCE TAX CALCULATOR
              </h3>
              <div className="row p-2  ">
                <div className="col-sm-8  ">
                  <label htmlFor="" className="form-label fs-5">
                    PAN No.
                  </label>
                </div>
                <div className="col-sm-4">
                  <input
                    type="text"
                    name="pan"
                    placeholder="pan number "
                    value={panNumber}
                    className="form-control"
                    onChange={(e) => {
                      setPanNumber(e.target.value);
                    }}
                  />
                  {formik.errors.pan && (
                    <p className="text-danger">{formik.errors.pan}</p>
                  )}
                </div>
              </div>
              <div className="row p-2  ">
                <div className="col-sm-8  ">
                  <label htmlFor="" className="form-label fs-5">
                    Tax Payer
                  </label>
                </div>
                <div className="col-sm-4">
                  <select
                    name="filing_category"
                    id=""
                    className="float-end form-select"
                    onChange={(e) => {
                      //  formik.handleChange()
                      setSelect(e.target.value);
                    }}
                  >
                    <option value={""}>Select</option>
                    <option value={"General"}>Individual</option>
                    <option value={"HUF(Hindu undivided family)"}>
                      HUF(Hindu undivided family)
                    </option>
                    <option value={"AOP/BOI"}>AOP/BOI</option>
                    <option value={"Domestic Company"}>Domestic Company</option>
                    <option value={"Foreign Company"}>Foreign Company</option>
                    <option value={"Firms"}>Firms</option>
                    <option value={"LLP"}>LLP</option>
                    <option value={"Co-operative Society"}>
                      Co-operative Society{" "}
                    </option>
                  </select>
                </div>
              </div>
              <div className="row p-2  ">
                <div className="col-sm-8  ">
                  <label htmlFor="" className="form-label fs-5">
                    Assessment Year
                  </label>
                </div>
                <div className="col-sm-4">
                  <select
                    name="financial_year"
                    id=""
                    className="float-end form-select"
                    value={formik.values.financial_year}
                    onChange={formik.handleChange}
                  >
                    <option selected>Choose...</option>
                    <option value={"FY 2022-23"}>2022-23</option>
                    <option value={"FY 2021-22"}>2021-22</option>
                    <option value={"FY 2020-21"}>2020-21</option>
                    <option value={"FY 2019-20"}>2019-20</option>
                    <option value={"FY 2018-19"}>2018-19</option>
                    <option value={"FY 2017-18"}>2017-18</option>
                    <option value={"FY 2016-17"}>2016-17</option>
                    <option value={"FY 2015-16"}>2015-16</option>
                    <option value={"FY 2014-15"}>2014-15</option>
                    <option value={"FY 2013-14"}>2013-14</option>
                    <option value={"FY 2012-13"}>2012-13</option>
                    <option value={"FY 2011-12"}>2011-12</option>
                    <option value={"FY 2010-11"}>2010-11</option>
                  </select>
                </div>
              </div>
              <form action="" onSubmit={formik.handleSubmit}>
                {select == "" && (
                  <>
                    <div className="row p-2  ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Net Taxable Income
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control " readOnly />
                      </div>
                    </div>
                    <div className="row p-2   mb-2">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2  mb-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Surcharge
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2  mb-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Health and Education Cess
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2  mb-2">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Total Tax Liability
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2  mb-2">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Relief
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2  mb-2">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          TDS/TCS/MAT (AMT) Credit Utilized
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2  mb-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Assessed Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </>
                )}

                {select === "General" && (
                  <>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Whether opting for taxation under Section 115BAC?
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <select
                          name=""
                          id=""
                          className="form-select"
                          onChange={(e) => {
                            setSection115Bac(e.target.value);
                          }}
                        >
                          <option value="no">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Male / Female / Senior Citizen
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <select name="" id="" className="form-select">
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="senior_citizen">Senior Citizen</option>
                          <option value="super_senior_citizen">
                            Super Senior Citizen
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Residential Status
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <select
                          name="residential_status"
                          id=""
                          className="form-select"
                          onChange={formik.handleChange}
                        >
                          <option value="">Select</option>
                          <option value="resident">Resident</option>
                          <option value="non_resident">Non Resident</option>
                          <option value="not_ordinary_resident">
                            Not Ordinary Resident
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5 fw-normal">
                          {secetion115Bac == "no"
                            ? "Income from Salary (Income from salary after standard deduction of Rs.50000."
                            : "Income from salary (Income from Salary before Exemptions/Deductions"}
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input
                          name="basic_salary"
                          type="text"
                          className="form-control"
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income From House Property
                        </label>
                        <span
                          onClick={(e) => {
                            setShowHide1((prev) => !prev);
                          }}
                          role={"button"}
                          class="badge bg-dark float-end"
                        >
                          {showHide1 ? "Hide Details" : "Show Details"}
                        </span>
                      </div>

                      <div className="col-sm-4">
                        <input value={INCOME_FROM_HOUSE_PROERTY > 0 ? -INCOME_FROM_HOUSE_PROERTY : INCOME_FROM_HOUSE_PROERTY} type="number" className="form-control" />
                      </div>
                    </div>
                    {showHide1 && (
                      <>
                        <div
                          className="row p-3 "
                          style={{ backgroundColor: "gray", color: "black" }}
                        >
                          <div className="col-sm-8  ">
                            <label
                              htmlFor=""
                              className="form-label m-2  fs-5 fw-normal "
                            >
                              <input type="checkbox" value={false} className=' ' style={{ width: "20px", height: "18px" }} onChange={checkInterest} /> <span>(a)Income from Self-occupied Property or Interest
                                Paid/Payable on Housing Loan</span>

                            </label>
                          </div>
                          {/* { unchecked let out property section} */}
                          {!isLetoutSelected && (<>
                            <div className="col-sm-8  ">
                              <label htmlFor="" className="form-label fs-5 fw-lighter ">
                                (a)1. Interest on Housing Loan
                              </label>
                            </div>
                            <div className="col-sm-4 mb-2">
                              <input type="number" className="form-control" onChange={getuncheckedLetoutAmountHandler} />
                            </div>

                            <div className="col-sm-8  ">
                              <label htmlFor="" className="form-label fs-5  fw-light ">
                                (a)2. Income from self-occupied house property
                              </label>
                            </div>
                            <div className="col-sm-4 mb-2">
                              <input value={uncheckedLetoutAmount ? -uncheckedLetoutAmount : ""} type="number" className="form-control" readOnly />
                            </div>
                          </>)}

                          {/* { checked let out property section} */}
                          {
                            isLetoutSelected && (<>
                              <p className=" lead  fs-5 fw-normal">
                                {" "}
                                b. Income from Let-out Property
                              </p>
                              <div className="col-sm-8  ">
                                <label htmlFor="" className="form-label fs-5 fw-light ">
                                  (b)1. Annual Letable Value/Rent Received or Receivable
                                </label>
                              </div>
                              <div className="col-sm-4 mb-2">
                                <input value={checkedLetoutAmount.value1 ? checkedLetoutAmount.value1 : ""} type="number" className="form-control" name="value1" onChange={getCheckedLetoutAmountHandler} />
                              </div>

                              <div className="col-sm-8  ">
                                <label htmlFor="" className="form-label fs-5 fw-lighter ">
                                  (b)2. Less: Municipal Taxes Paid During the Year
                                </label>
                              </div>
                              <div className="col-sm-4 mb-2">
                                <input value={checkedLetoutAmount.value2 ? checkedLetoutAmount.value2 : ""} type="number" className="form-control" name="value2" onChange={getCheckedLetoutAmountHandler} />
                              </div>

                              <div className="col-sm-8  ">
                                <label htmlFor="" className="form-label fs-5 fw-lighter ">
                                  (b)3. Less:Unrealized Rent
                                </label>
                              </div>
                              <div className="col-sm-4 mb-2">
                                <input value={checkedLetoutAmount.value3 ? checkedLetoutAmount.value3 : ""} type="number" className="form-control" name="value3" onChange={getCheckedLetoutAmountHandler} />
                              </div>

                              <div className="col-sm-8  ">
                                <label htmlFor="" className="form-label fs-5 fw-lighter">
                                  (b)4. Net Annual Value (1-(2+3))
                                </label>
                              </div>
                              <div className="col-sm-4 mb-2">
                                <input value={NET_ANNUAL_INCOME ? NET_ANNUAL_INCOME : ""} type="number" className="form-control" readOnly />
                              </div>

                              <p className=" lead  fw-normal">
                                {" "}
                                c. Less: Deductions from Net Annual Value
                              </p>
                              <div className="col-sm-8  ">
                                <label htmlFor="" className="form-label fs-5 fw-lighter">
                                  (c)1. Standard Deduction @ 30% of Net Annual Value
                                </label>
                              </div>
                              <div className="col-sm-4 mb-2">
                                <input value={STANDARD_DETUCTION} type="number" className="form-control" readOnly />
                              </div>

                              <div className="col-sm-8  ">
                                <label htmlFor="" className="form-label fs-5 fw-lighter ">
                                  (c)2. Interest on Housing Loan
                                </label>
                              </div>
                              <div className="col-sm-4 mb-2">
                                <input value={checkedLetoutAmount.value4 ? checkedLetoutAmount.value4 : ""} type="number" className="form-control" name="value4" onChange={getCheckedLetoutAmountHandler} />
                              </div>

                              <div className="col-sm-8  ">
                                <label htmlFor="" className="form-label fs-5 fw-lighter">
                                  (c)3. Income from Let-out House Property
                                </label>
                              </div>
                              <div className="col-sm-4 mb-2">
                                <input value={LET_OUT_INCOME > 0 ? -LET_OUT_INCOME : LET_OUT_INCOME} type="number" className="form-control" readOnly />
                              </div>

                            </>)
                          }

                        </div>
                      </>
                    )}
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Capital Gains
                        </label>
                        <span
                          onClick={(e) => {
                            setShowHide2((prev) => !prev);
                          }}
                          role={"button"}
                          class="badge bg-dark float-end"
                        >
                          {showHide2 ? "Hide Details" : "Show Details"}
                        </span>
                      </div>
                      <div className="col-sm-4">
                        <input value={TOTAL_CAPITAL_GAINS} type="text" className="form-control" readOnly />
                      </div>
                    </div>
                    {showHide2 && (
                      <>
                        <div className="row p-3" style={{ backgroundColor: "gray" }}>
                          <p className="lead fw-normal fs-5">
                            {" "}
                            (a).Short Term Capital GainS (Other than covered under
                            section 111A)
                          </p>
                          <div className="col-sm-12">
                            <div className="row">
                              <div className="col">
                                <label className="">
                                  From 01/04/2022 to 15/06/2022
                                </label>
                                <input
                                  name="value1"
                                  type="number"
                                  className="form-control"
                                  onChange={stcgOneHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/06/2022 to 15/09/2022</label>
                                <input
                                  name="value2"
                                  type="number"
                                  className="form-control"
                                  onChange={stcgOneHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/09/2022 to 15/12/2022</label>
                                <input
                                  name="value3"
                                  type="number"
                                  className="form-control"
                                  onChange={stcgOneHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/12/2022 to 15/03/2023</label>
                                <input
                                  name="value4"
                                  type="number"
                                  className="form-control"
                                  onChange={stcgOneHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/03/2022 to 31/03/2023</label>
                                <input
                                  name="value5"
                                  type="number"
                                  className="form-control"
                                  onChange={stcgOneHandler}
                                />
                              </div>
                              <div className="col mt-5">
                                <label htmlFor="" className="fw-bold">
                                  Total
                                </label>
                                <input
                                  value={calculateSum(stcg1)}
                                  type="number"
                                  className="form-control"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>

                          <p className="lead fw-normal fs-5 mt-3">
                            {" "}
                            (b).Short Term Capital GainS (Covered under section 111A)
                          </p>
                          <div className="col-sm-12">
                            <div className="row">
                              <div className="col">
                                <label className="">
                                  From 01/04/2022 to 15/06/2022
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value1"
                                  onChange={stcgTwoHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/06/2022 to 15/09/2022</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value2"
                                  onChange={stcgTwoHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/09/2022 to 15/12/2022</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value3"
                                  onChange={stcgTwoHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/12/2022 to 15/03/2023</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value4"
                                  onChange={stcgTwoHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/03/2022 to 31/03/2023</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value5"
                                  onChange={stcgTwoHandler}
                                />
                              </div>
                              <div className="col mt-5">
                                <label htmlFor="" className="fw-bold">
                                  Total
                                </label>
                                <input
                                  value={calculateSum(stcg2)}
                                  type="number"
                                  className="form-control"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>

                          <p className="lead fw-normal fs-5 mt-3">
                            {" "}
                            (c).Long Term Capital Gains (Charged to tax @ 20%)
                          </p>
                          <div className="col-sm-12">
                            <div className="row">
                              <div className="col">
                                <label className="">
                                  From 01/04/2022 to 15/06/2022
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value1"
                                  onChange={ltcgOneHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/06/2022 to 15/09/2022</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value2"
                                  onChange={ltcgOneHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/09/2022 to 15/12/2022</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value3"
                                  onChange={ltcgOneHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/12/2022 to 15/03/2023</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value4"
                                  onChange={ltcgOneHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/03/2022 to 31/03/2023</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value5"
                                  onChange={ltcgOneHandler}
                                />
                              </div>
                              <div className="col mt-5">
                                <label htmlFor="" className="fw-bold">
                                  Total
                                </label>
                                <input
                                  value={calculateSum(ltcg1)}
                                  type="number"
                                  className="form-control"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>

                          <p className="lead fw-normal fs-5 mt-3">
                            {" "}
                            (d).Long Term Capital Gains (Charged to tax @ 10%)
                          </p>
                          <div className="col-sm-12">
                            <div className="row">
                              <div className="col">
                                <label className="">
                                  From 01/04/2022 to 15/06/2022
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value1"
                                  onChange={ltcgTwoHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/06/2022 to 15/09/2022</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value2"
                                  onChange={ltcgTwoHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/09/2022 to 15/12/2022</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value3"
                                  onChange={ltcgTwoHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/12/2022 to 15/03/2023</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value4"
                                  onChange={ltcgTwoHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/03/2022 to 31/03/2023</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value5"
                                  onChange={ltcgTwoHandler}
                                />
                              </div>
                              <div className="col mt-5">
                                <label htmlFor="" className="fw-bold">
                                  Total
                                </label>
                                <input
                                  value={calculateSum(ltcg2)}
                                  type="number"
                                  className="form-control"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>

                          <p className="lead fw-normal fs-5 mt-3">
                            {" "}
                            (e)Long Term Capital GainS (Covered under section 112A)
                          </p>
                          <div className="col-sm-12">
                            <div className="row">
                              <div className="col">
                                <label className="">
                                  From 01/04/2022 to 15/06/2022
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value1"
                                  onChange={ltcgThreeHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/06/2022 to 15/09/2022</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value2"
                                  onChange={ltcgThreeHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/09/2022 to 15/12/2022</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value3"
                                  onChange={ltcgThreeHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/12/2022 to 15/03/2023</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value4"
                                  onChange={ltcgThreeHandler}
                                />
                              </div>
                              <div className="col">
                                <label>From 16/03/2022 to 31/03/2023</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="value5"
                                  onChange={ltcgThreeHandler}
                                />
                              </div>
                              <div className="col mt-5">
                                <label htmlFor="" className="fw-bold">
                                  Total
                                </label>
                                <input
                                  value={calculateSum(ltcg3)}
                                  type="number"
                                  className="form-control"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income From Other Sources
                        </label>
                        <span
                          onClick={(e) => {
                            setShowHide3((prev) => !prev);
                          }}
                          role={"button"}
                          class="badge bg-dark float-end"
                        >
                          {showHide3 ? "Hide Details" : "Show Details"}
                        </span>
                      </div>
                      <div className="col-sm-4">
                        <input value={calculateSum(incomeFromOtherSource)} type="text" className="form-control" />
                      </div>
                    </div>
                    {showHide3 && (
                      <>
                        <div
                          className="row p-3 "
                          style={{ backgroundColor: "gray", color: "black" }}
                        >
                          <div className="col-sm-8 mb-4  ">
                            <label htmlFor="" className="form-label fs-5 fw-lighter ">
                              Interest
                            </label>
                          </div>
                          <div className="col-sm-4 mb-4">
                            <input type="number" className="form-control" value={incomeFromOtherSource.value1 > 0 ? incomeFromOtherSource.value1 : ""} name='value1' onChange={incomeFromOtherSourceHandler} />
                          </div>

                          <div className="col-sm-8 mb-4 ">
                            <label htmlFor="" className="form-label fs-5 fw-lighter ">
                              Commission/Other Income
                            </label>
                          </div>
                          <div className="col-sm-4 mb-4 ">
                            <input type="number" className="form-control" value={incomeFromOtherSource.value2 > 0 ? incomeFromOtherSource.value2 : ""} name='value2' onChange={incomeFromOtherSourceHandler} />
                          </div>
                          <div className="col-sm-8 mb-4 ">
                            <label htmlFor="" className="form-label fs-5 fw-lighter ">
                              Winnings from Lottery, Crossword Puzzles, etc.
                            </label>
                          </div>
                          <div className="col-sm-4 mb-4">
                            <input type="number" className="form-control" value={incomeFromOtherSource.value3 > 0 ? incomeFromOtherSource.value3 : ""} name='value3' onChange={incomeFromOtherSourceHandler} />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Profits and Gains of Business or Profession (enter profit
                          only)
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Agricultural Income
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Deductions
                        </label>
                        <span
                          onClick={(e) => {
                            setShowHide4((prev) => !prev);
                          }}
                          role={"button"}
                          class="badge bg-dark float-end"
                        >
                          {showHide4 ? "Hide Details" : "Show Details"}
                        </span>
                      </div>
                      <div className="col-sm-4">
                        <input value={TOTAL_DEDUCTION ? TOTAL_DEDUCTION : ""} type="number" className="form-control" readOnly />
                      </div>
                    </div>
                    {showHide4 && (
                      <>
                        <div className="row p-3" style={{ backgroundColor: "gray" }}>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Life Insurance premium paid
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value1} name='value1' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Payment for annuity plan
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value2} name='value2' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Contribution toward provident fund / PPF
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value3} name='value3' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Investment in NSC (VIII issue) + Interest
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value4} name='value4' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Contribution toward ULIP
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value5} name='value5' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Contribution toward notified pension fund by MF/UTI
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value6} name='value6' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Re-payment of housing loan etc
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value7} name='value7' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Tuition fees paid for children
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value8} name='value8' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              5 Years fixed deposit with PO or Schedule Bank
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value9} name='value9' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Contribution toward NPF
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value10} name='value10' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Employee's / Self-employed contribution toward NPS (up
                              to 20%) (u/s 80CCD)
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value11} name='value11' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Additional contribution towards NPS [u/s 80CCD(1B)]
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={npsAmount.value1} name='value1' onChange={npsAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Employer's contribution toward NPS (u/s 80CCD)
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={npsAmount.value2} name='value2' onChange={npsAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Deposit with Sukanya Samridhi Accounts
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value12} name='value12' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Any other deductable (u/s 80C)
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions.value13} name='value13' onChange={deductionAmountHandler} />
                          </div>
                          <div className="col-sm-8 p-2 bg-dark  ">
                            <label htmlFor="" className="form-label text-white ">
                              Total
                            </label>
                          </div>
                          <div className="col-sm-4 bg-dark  ">
                            <input
                              value={TOTAL_DEDUCTION_PART1 > 0 ? TOTAL_DEDUCTION_PART1 : ""}
                              type="number"
                              className="form-control mt-1 "
                              readOnly
                            />
                          </div>

                          <div className="col-sm-8 mt-3 ">
                            <label htmlFor="" className="form-label">
                              Medi-claim premium (u/s 80D)
                            </label>
                          </div>
                          <div className="col-sm-4 mt-3 mb-3">
                            <input type="number" className="form-control" value={deductions2.value14} name='value14' onChange={deductionAmountHandler2} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Actual payment towards medical treatment (u/s 80DDB )
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions2.value15} name='value15' onChange={deductionAmountHandler2} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Interest payable on loan for residentials house property
                              (u/s 80EEA )
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions2.value16} name='value16' onChange={deductionAmountHandler2} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Interest payable on loan for purchase of electric
                              vehicles(u/s 80EEB )
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions2.value17} name='value17' onChange={deductionAmountHandler2} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Donations (u/s 80G)
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions2.value18} name='value18' onChange={deductionAmountHandler2} />
                          </div>

                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Deduction for maintenance / medical treatment of
                              dependent (u/s 80DD)
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input value={amount80DD} type="number" className="form-control" readOnly />
                          </div>
                          <div className="col-sm-12">
                            <input type="checkbox" onChange={amount80DDHanlder} />
                            <label htmlFor="" className="fw-bold m-2">
                              Tick if 80D is claimed
                            </label>
                          </div>
                          <div className="col-sm-12">
                            <input type="checkbox" className="" onChange={severe_disabilityCheck1Handler} />
                            <label htmlFor="" className=" fw-bold m-2">
                              Tick if severe disability
                            </label>
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Interest on loan for higher education (u/s 80E)
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions2.value19} name='value19' onChange={deductionAmountHandler2} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Interest on loan taken for Residential House (u/s 80EE)
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions2.value20} name='value20' onChange={deductionAmountHandler2} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Deduction in case of a person with disability (u/s 80U)
                            </label>
                          </div>

                          <div className="col-sm-4">
                            <input value={amount80U} type="number" className="form-control" readOnly />
                          </div>
                          <div className="col-sm-12">
                            <input type="checkbox" className="mr-3" onChange={amount80UHanlder} />
                            <label htmlFor="" className=" fw-bold m-2">
                              Tick if 80U is claimed
                            </label>
                          </div>
                          <div className="col-sm-12 mb-3">
                            <input type="checkbox" className="" onChange={severe_disabilityCheck2Handler} />
                            <label htmlFor="" className=" fw-bold m-2">
                              Tick if severe disability
                            </label>
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Interest on deposits(u/s 80TTB)
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions2.value21} name='value21' onChange={deductionAmountHandler2} />
                          </div>
                          <div className="col-sm-8 mb-4">
                            <label htmlFor="" className="form-label">
                              Any other deductions
                            </label>
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" value={deductions2.value22} name='value22' onChange={deductionAmountHandler2} />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="row p-2 ">
                      <div className="col-sm-8   ">
                        <label htmlFor="" className="form-label fs-5">
                          Net Taxable Income
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input value={formik.values.basic_salary} type="number" className="form-control" readOnly />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-4  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income Liable to Tax at Normal Rate ---
                        </label>
                      </div>
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-3">
                            <input type="number" className="form-control" />
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-4  ">
                        <label htmlFor="" className="form-label fs-5">
                          Short Term Capital Gains (Covered u/s 111A) 15%
                        </label>
                      </div>
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-3">
                            <input type="number" className="form-control" />
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-4  ">
                        <label htmlFor="" className="form-label fs-5">
                          Long Term Capital Gains (Covered u/s 112A) 10%
                        </label>
                      </div>
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-3">
                            <input type="number" className="form-control" />
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-4  ">
                        <label htmlFor="" className="form-label fs-5">
                          Long Term Capital Gains (Charged to tax @ 20%) 20%
                        </label>
                      </div>
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-3">
                            <input type="number" className="form-control" />
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-4  ">
                        <label htmlFor="" className="form-label fs-5">
                          Long Term Capital Gains (Charged to tax @ 10%) 10%
                        </label>
                      </div>
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-3">
                            <input type="number" className="form-control" />
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-4  ">
                        <label htmlFor="" className="form-label fs-5">
                          Winnings from Lottery, Crossword Puzzles, etc) 30%
                        </label>
                      </div>
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-3">
                            <input type="number" className="form-control" />
                          </div>
                          <div className="col-sm-4">
                            <input type="number" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income Tax after relief u/s 87A
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Surcharge
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Health and Education Cess
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Total Tax Liability
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Relief other than relief u/s 87A
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          TDS/TCS/MAT (AMT) Credit Utilized
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Assessed Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </>
                )}

                {select === "HUF(Hindu undivided family)" && (
                  <>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Whether opting for taxation under Section 115BAC?
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <select name="" id="" className="form-select">
                          <option value="">select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Net Taxable Income
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Surcharge
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Health and Education Cess
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Total Tax Liability
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Relief
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          TDS/TCS/MAT (AMT) Credit Utilized
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Assessed Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </>
                )}
                {select === "AOP/BOI" && (
                  <>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Net Taxable Income
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Surcharge
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Health and Education Cess
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Total Tax Liability
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Relief
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          TDS/TCS/MAT (AMT) Credit Utilized
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Assessed Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </>
                )}
                {select === "Domestic Company" && (
                  <>
                    <div className="row p-2 ">
                      <div className="col-sm-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                          style={{ width: "10px", height: "10px" }}
                        />
                      </div>
                      <div className="col-sm-11">
                        <label
                          class="form-check-label fw-bold"
                          for="flexCheckDefault"
                        >
                          Tick if, total turnover or gross receipt of the company in
                          the previous year 2017-18 does not exceed 400 crore rupees
                        </label>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault2"
                          style={{ width: "10px", height: "10px" }}
                        />
                      </div>
                      <div className="col-sm-11">
                        <label
                          class="form-check-label fw-bold"
                          for="flexCheckDefault2"
                        >
                          Tick if, company opted and qualify under section 115BA
                        </label>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault3"
                          style={{ width: "10px", height: "10px" }}
                        />
                      </div>
                      <div className="col-sm-11">
                        <label
                          class="form-check-label fw-bold"
                          for="flexCheckDefault3"
                        >
                          Tick if, company opted and qualify for section 115BAA
                        </label>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault4"
                          style={{ width: "10px", height: "10px" }}
                        />
                      </div>
                      <div className="col-sm-11">
                        <label
                          class="form-check-label fw-bold"
                          for="flexCheckDefault4"
                        >
                          Tick if, company opted and qualify for section 115BAB
                        </label>
                      </div>
                    </div>

                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Net Taxable Income
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Surcharge
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Health and Education Cess
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Total Tax Liability
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Relief
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          TDS/TCS/MAT (AMT) Credit Utilized
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Assessed Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </>
                )}
                {select === "Foreign Company" && (
                  <>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Net Taxable Income
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Surcharge
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Health and Education Cess
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Total Tax Liability
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Relief
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          TDS/TCS/MAT (AMT) Credit Utilized
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Assessed Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </>
                )}
                {select === "Firms" && (
                  <>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Net Taxable Income
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Surcharge
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Health and Education Cess
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Total Tax Liability
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Relief
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          TDS/TCS/MAT (AMT) Credit Utilized
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Assessed Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </>
                )}
                {select === "LLP" && (
                  <>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Net Taxable Income
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Surcharge
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Health and Education Cess
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Total Tax Liability
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Relief
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          TDS/TCS/MAT (AMT) Credit Utilized
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Assessed Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </>
                )}
                {select === "Co-operative Society" && (
                  <>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Co-operative society opted and qualify for section 115BAD
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <select name="" id="" className="form-select">
                          <option value="">select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Net Taxable Income
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Income Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Surcharge
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Health and Education Cess
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Total Tax Liability
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Relief
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          TDS/TCS/MAT (AMT) Credit Utilized
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row p-2 ">
                      <div className="col-sm-8  ">
                        <label htmlFor="" className="form-label fs-5">
                          Assessed Tax
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </>
                )}
              </form>
              <div
                className="d-flex flex-sm-col gap-3   "
                style={{ width: "100%", margin: "auto", marginTop: "5%" }}
              >
                <button className="btn1 me-3  mt-2 bn39 "><span className="bn39span">Reset</span></button>


                <button
                  type="submit"
                  className=" btn1 me-3  mt-2 bn39  "
                  style={{
                    height: "3rem",
                    width: "8rem",
                    borderRadius: "10px",
                  }}
                  onClick={formik.handleSubmit}
                >
                  <span className="bn39span">Calculate</span>
                </button>


              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
