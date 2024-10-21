import React, { useState } from 'react';

const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  const generateRandomNumbers = () => {
    const numbers: number[] = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setRandomNumbers(numbers);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Random Number Generator</h1>
      <div className="mb-4">
        <label className="block mb-2">Minimum Value:</label>
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Maximum Value:</label>
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Number of Random Numbers:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          min="1"
          max="100"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={generateRandomNumbers}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate Random Numbers
      </button>
      {randomNumbers.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Generated Numbers:</h2>
          <ul className="list-disc pl-5">
            {randomNumbers.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc pl-5">
          <li>Enter the minimum and maximum values for the range</li>
          <li>Specify the number of random numbers you want to generate (1-100)</li>
          <li>Click "Generate Random Numbers" to create your random set</li>
          <li>The generated numbers will be integers within the specified range, inclusive</li>
        </ul>
      </div>
    </div>
  );
};

export default RandomNumberGenerator;