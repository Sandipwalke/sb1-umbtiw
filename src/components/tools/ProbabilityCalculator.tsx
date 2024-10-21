import React, { useState } from 'react';

const ProbabilityCalculator: React.FC = () => {
  const [probabilityA, setProbabilityA] = useState('');
  const [probabilityB, setProbabilityB] = useState('');
  const [calculationType, setCalculationType] = useState('and');
  const [result, setResult] = useState<number | null>(null);

  const calculateProbability = () => {
    const pA = parseFloat(probabilityA);
    const pB = parseFloat(probabilityB);

    if (isNaN(pA) || isNaN(pB) || pA < 0 || pA > 1 || pB < 0 || pB > 1) {
      alert('Please enter valid probabilities between 0 and 1');
      return;
    }

    let calculatedResult: number;

    switch (calculationType) {
      case 'and':
        calculatedResult = pA * pB;
        break;
      case 'or':
        calculatedResult = pA + pB - pA * pB;
        break;
      case 'not':
        calculatedResult = 1 - pA;
        break;
      case 'conditional':
        if (pB === 0) {
          alert('Probability B cannot be 0 for conditional probability');
          return;
        }
        calculatedResult = pA / pB;
        break;
      default:
        return;
    }

    setResult(calculatedResult);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Probability Calculator</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="probabilityA">
            Probability A:
          </label>
          <input
            id="probabilityA"
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={probabilityA}
            onChange={(e) => setProbabilityA(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="probabilityB">
            Probability B:
          </label>
          <input
            id="probabilityB"
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={probabilityB}
            onChange={(e) => setProbabilityB(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calculationType">
            Calculation Type:
          </label>
          <select
            id="calculationType"
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="and">P(A and B)</option>
            <option value="or">P(A or B)</option>
            <option value="not">P(not A)</option>
            <option value="conditional">P(A|B) - Conditional</option>
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={calculateProbability}
        >
          Calculate
        </button>
        {result !== null && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Result:</h2>
            <p className="text-lg">{result.toFixed(4)}</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Probability Formulas:</h2>
        <ul className="list-disc pl-5">
          <li>P(A and B) = P(A) * P(B) (for independent events)</li>
          <li>P(A or B) = P(A) + P(B) - P(A and B)</li>
          <li>P(not A) = 1 - P(A)</li>
          <li>P(A|B) = P(A and B) / P(B) (conditional probability)</li>
        </ul>
      </div>
    </div>
  );
};

export default ProbabilityCalculator;