import React, { useState } from 'react';

const BmiCalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum) || heightNum === 0) {
      alert('Please enter valid weight and height values');
      return;
    }

    const bmiValue = weightNum / ((heightNum / 100) ** 2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">BMI Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={calculateBMI}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Calculate BMI
      </button>
      {bmi !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <p>Your BMI: {bmi.toFixed(1)}</p>
          <p>Category: {category}</p>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">BMI Categories:</h2>
        <ul className="list-disc pl-5">
          <li>Underweight: BMI less than 18.5</li>
          <li>Normal weight: BMI 18.5 to 24.9</li>
          <li>Overweight: BMI 25 to 29.9</li>
          <li>Obese: BMI 30 or greater</li>
        </ul>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Note: BMI is a general indicator and may not be accurate for all body types.
          Consult a healthcare professional for a more comprehensive health assessment.
        </p>
      </div>
    </div>
  );
};

export default BmiCalculator;