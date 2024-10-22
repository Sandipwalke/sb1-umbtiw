import React, { useState } from 'react';
import * as math from 'mathjs';

const AlgebraSolver: React.FC = () => {
  const [equation, setEquation] = useState('');
  const [variable, setVariable] = useState('x');
  const [result, setResult] = useState<string | null>(null);

  const solveEquation = () => {
    try {
      // Parse the equation
      const parsedEquation = math.parse(equation);
      
      // Solve for the variable
      const solution = math.solve(parsedEquation, variable);
      
      // Format the result
      if (Array.isArray(solution)) {
        setResult(`${variable} = ${solution.join(' or ')}`);
      } else {
        setResult(`${variable} = ${solution}`);
      }
    } catch (error) {
      setResult('Error: Invalid equation or unable to solve');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Algebra Solver</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="equation">
            Enter an equation:
          </label>
          <input
            id="equation"
            type="text"
            placeholder="e.g., 2x + 3 = 7"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="variable">
            Variable to solve for:
          </label>
          <input
            id="variable"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={solveEquation}
        >
          Solve
        </button>
        {result && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Solution:</h2>
            <p className="text-lg">{result}</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">How to use:</h2>
        <ul className="list-disc pl-5">
          <li>Enter a linear or quadratic equation using the variable you specified (default is 'x').</li>
          <li>The equation should be in the form "expression = expression".</li>
          <li>Use * for multiplication and ^ for exponents.</li>
          <li>Examples:
            <ul className="list-disc pl-5">
              <li>Linear: 2x + 3 = 7</li>
              <li>Quadratic: x^2 + 5x + 6 = 0</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AlgebraSolver;