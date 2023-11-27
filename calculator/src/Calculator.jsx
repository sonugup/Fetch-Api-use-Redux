import React from "react";
import "./calculator.css"
import { useState } from "react";
const Calculator = () => {

  const [result, setResult] = useState("");

  const heandleclick = (e) => {
    setResult(result.concat(e.target.name))
  }

  const clear = () => {
    setResult("")
  }

  const back = () => {
    setResult(result.slice(0, result.length - 1))
  }

  const calulate = () => {
    try {
      setResult(eval(result).toString())
    } catch {
      setResult("Error")
    }

  }
  return (
    <>
      <div className="Box">
        <hr />
        <div className="container">
          <form action="">
            <input type="text" value={result} />
          </form>
          <div className="keypad">
            <button className="colores" onClick={clear} id="clear">Clear</button>
            <button className="colores" onClick={back} id="back">Back</button>
            <button className="colores" name="/" onClick={heandleclick}>&divide;</button>
            <button name="7" onClick={heandleclick}>7</button>
            <button name="8" onClick={heandleclick}>8</button>
            <button name="9" onClick={heandleclick}>9</button>
            <button className="colores" name="*" onClick={heandleclick}>&times;</button>
            <button name="4" onClick={heandleclick}>4</button>
            <button name="5" onClick={heandleclick}>5</button>
            <button name="6" onClick={heandleclick}>6</button>
            <button className="colores" name="-" onClick={heandleclick}>&ndash;</button>
            <button name="1" onClick={heandleclick}>1</button>
            <button name="2" onClick={heandleclick}>2</button>
            <button name="3" onClick={heandleclick}>3</button>
            <button className="colores" name="+" onClick={heandleclick}>+</button>
            <button name="." onClick={heandleclick}>.</button>
            <button name="0" onClick={heandleclick}>0</button>
            <button className="colores" onClick={calulate} id="result">=</button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Calculator;
