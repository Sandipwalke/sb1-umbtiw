import React, { useState } from 'react';

const PercentageCalculator: React.FC = () => {
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationType, setCalculationType] = useState('percentOf');

  const calculate = () => {
    const numValue = parseFloat(value);
    const numPercentage = parseFloat(percentage);

    if (isNaN(numValue) || isNaN(numPercentage)) {
      setResult(null);
      return;
    }

    switch (calculationType) {
      case 'percentOf':
        setResult((numValue * numPercentage) / 100);
        break;
      case 'percentageChange':
        setResult(((numPercentage - numValue) / numValue) * 100);
        break;
      case 'whatPercentage':
        setResult((numValue / numPercentage) * 100);
        break;
      default:
        setResult(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Percentage Calculator</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calculationType">
            Calculation Type
          </label>
          <select
            id="calculationType"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value)}
          >
            <option value="percentOf">Percent of a Number</option>
            <option value="percentageChange">Percentage Change</option>
            <option value="whatPercentage">What Percentage is X of Y</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
            {calculationType === 'percentOf' ? 'Number' : calculationType === 'percentageChange' ? 'Original Value' : 'X Value'}
          </label>
          <input
            id="value"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="percentage">
            {calculationType === 'percentOf' ? 'Percentage' : calculationType === 'percentageChange' ? 'New Value' : 'Y Value'}
          </label>
          <input
            id="percentage"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={calculate}
        >
          Calculate
        </button>
        {result !== null && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Result:</h2>
            <p className="text-lg">
              {calculationType === 'percentOf'
                ? `${percentage}% of ${value} is ${result.toFixed(2)}`
                : calculationType === 'percentageChange'
                ? `The percentage change from ${value} to ${percentage} is ${result.toFixed(2)}%`
                : `${value} is ${result.toFixed(2)}% of ${percentage}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PercentageCalculator;