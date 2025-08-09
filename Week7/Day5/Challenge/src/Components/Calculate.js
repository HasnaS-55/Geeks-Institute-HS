import React, { useState } from 'react';

export function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setResult('Please enter valid numbers');
      return;
    }

    let calculatedResult;
    switch (operation) {
      case 'add':
        calculatedResult = number1 + number2;
        break;
      case 'subtract':
        calculatedResult = number1 - number2;
        break;
      case 'multiply':
        calculatedResult = number1 * number2;
        break;
      case 'divide':
        calculatedResult = number2 !== 0 ? number1 / number2 : 'Cannot divide by zero';
        break;
      default:
        calculatedResult = number1 + number2;
    }

    setResult(calculatedResult);
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setOperation('add');
    setResult(null);
  };

  return (
    <div className="calculator">
      <h2>React Calculator</h2>
      
      <div className="input-group">
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="First number"
        />
        
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">+</option>
          <option value="subtract">-</option>
          <option value="multiply">×</option>
          <option value="divide">÷</option>
        </select>
        
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Second number"
        />
      </div>
      
      <div className="button-group">
        <button onClick={calculate}>Calculate</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      
      {result !== null && (
        <div className="result">
          <h3>Result: {result}</h3>
        </div>
      )}
    </div>
  );
}

export default Calculator;