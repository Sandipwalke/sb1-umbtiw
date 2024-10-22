import React, { useState } from 'react';

const SimpleCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [prevValue, setPrevValue] = useState('');
  const [operation, setOperation] = useState('');

  const handleNumberClick = (num: string) => {
    if (display === '0' || operation === '=') {
      setDisplay(num);
      setCurrentValue(num);
    } else {
      setDisplay(display + num);
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperationClick = (op: string) => {
    if (op === '=') {
      calculate();
    } else {
      setOperation(op);
      setPrevValue(currentValue);
      setCurrentValue('');
    }
  };

  const calculate = () => {
    let result;
    switch (operation) {
      case '+':
        result = parseFloat(prevValue) + parseFloat(currentValue);
        break;
      case '-':
        result = parseFloat(prevValue) - parseFloat(currentValue);
        break;
      case '*':
        result = parseFloat(prevValue) * parseFloat(currentValue);
        break;
      case '/':
        result = parseFloat(prevValue) / parseFloat(currentValue);
        break;
      default:
        return;
    }
    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setOperation('=');
  };

  const clear = () => {
    setDisplay('0');
    setCurrentValue('');
    setPrevValue('');
    setOperation('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Calculator</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right text-2xl"
            type="text"
            value={display}
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/'].map((btn) => (
            <button
              key={btn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => btn === '/' ? handleOperationClick(btn) : handleNumberClick(btn)}
            >
              {btn}
            </button>
          ))}
          {['4', '5', '6', '*'].map((btn) => (
            <button
              key={btn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => btn === '*' ? handleOperationClick(btn) : handleNumberClick(btn)}
            >
              {btn}
            </button>
          ))}
          {['1', '2', '3', '-'].map((btn) => (
            <button
              key={btn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => btn === '-' ? handleOperationClick(btn) : handleNumberClick(btn)}
            >
              {btn}
            </button>
          ))}
          {['0', '.', '=', '+'].map((btn) => (
            <button
              key={btn}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => ['=', '+'].includes(btn) ? handleOperationClick(btn) : handleNumberClick(btn)}
            >
              {btn}
            </button>
          ))}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded col-span-4"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleCalculator;