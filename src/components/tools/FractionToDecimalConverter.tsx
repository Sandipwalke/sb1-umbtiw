import React, { useState } from 'react';

const FractionToDecimalConverter: React.FC = () => {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [decimal, setDecimal] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const convertFractionToDecimal = () => {
    const num = parseInt(numerator);
    const den = parseInt(denominator);
    if (isNaN(num) || isNaN(den) || den === 0) {
      setResult('Invalid input');
      return;
    }
    const decimalResult = (num / den).toFixed(6);
    setResult(`${num}/${den} = ${decimalResult}`);
  };

  const convertDecimalToFraction = () => {
    const dec = parseFloat(decimal);
    if (isNaN(dec)) {
      setResult('Invalid input');
      return;
    }
    
    // Convert decimal to fraction
    const precision = 1000000; // 6 decimal places
    let numerator = Math.round(dec * precision);
    let denominator = precision;
    let gcd = findGCD(numerator, denominator);
    
    numerator /= gcd;
    denominator /= gcd;
    
    setResult(`${dec} = ${numerator}/${denominator}`);
  };

  // Helper function to find Greatest Common Divisor
  const findGCD = (a: number, b: number): number => {
    return b === 0 ? a : findGCD(b, a % b);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fraction to Decimal Converter</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Fraction to Decimal</h2>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Numerator"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
            />
            <span className="text-2xl">/</span>
            <input
              type="number"
              placeholder="Denominator"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
            />
          </div>
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={convertFractionToDecimal}
          >
            Convert to Decimal
          </button>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Decimal to Fraction</h2>
          <input
            type="number"
            placeholder="Decimal"
            step="0.000001"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={convertDecimalToFraction}
          >
            Convert to Fraction
          </button>
        </div>
        {result && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Result:</h2>
            <p className="text-lg">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FractionToDecimalConverter;