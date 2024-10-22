import React, { useState } from 'react';

const QuadraticEquationSolver: React.FC = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const solveQuadratic = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      setResult('Please enter valid numbers for a, b, and c');
      return;
    }

    if (aNum === 0) {
      setResult('This is not a quadratic equation. "a" cannot be zero.');
      return;
    }

    const discriminant = bNum * bNum - 4 * aNum * cNum;

    if (discriminant > 0) {
      const x1 = (-bNum + Math.sqrt(discriminant)) / (2 * aNum);
      const x2 = (-bNum - Math.sqrt(discriminant)) / (2 * aNum);
      setResult(`Two real roots: x₁ = ${x1.toFixed(4)} and x₂ = ${x2.toFixed(4)}`);
    } else if (discriminant === 0) {
      const x = -bNum / (2 * aNum);
      setResult(`One real root: x = ${x.toFixed(4)}`);
    } else {
      const realPart = -bNum / (2 * aNum);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * aNum);
      setResult(`Two complex roots: x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i and x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quadratic Equation Solver</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="mb-4">Enter the coefficients of the quadratic equation ax² + bx + c = 0</p>
        <div className="flex mb-4">
          <div className="mr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="a">
              a
            </label>
            <input
              id="a"
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="b">
              b
            </label>
            <input
              id="b"
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="c">
              c
            </label>
            <input
              id="c"
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={solveQuadratic}
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
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <p>
          The quadratic formula is used to solve equations in the form ax² + bx + c = 0, where a ≠ 0.
          The formula is: x = [-b ± √(b² - 4ac)] / (2a)
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>If b² - 4ac {'>'} 0, there are two real roots.</li>
          <li>If b² - 4ac = 0, there is one real root (a double root).</li>
          <li>If b² - 4ac {'<'} 0, there are two complex roots.</li>
        </ul>
      </div>
    </div>
  );
};

export default QuadraticEquationSolver;