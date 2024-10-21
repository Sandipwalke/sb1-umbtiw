import React, { useState, useEffect } from 'react';

const UnitCircleCalculator: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [sinValue, setSinValue] = useState(0);
  const [cosValue, setCosValue] = useState(1);
  const [tanValue, setTanValue] = useState(0);

  useEffect(() => {
    const radians = (angle * Math.PI) / 180;
    setSinValue(Math.sin(radians));
    setCosValue(Math.cos(radians));
    setTanValue(Math.tan(radians));
  }, [angle]);

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAngle = parseFloat(e.target.value);
    setAngle(isNaN(newAngle) ? 0 : newAngle);
  };

  const renderUnitCircle = () => {
    const centerX = 150;
    const centerY = 150;
    const radius = 100;

    const radians = (angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(radians);
    const y = centerY - radius * Math.sin(radians);

    return (
      <svg width="300" height="300" className="border rounded">
        <circle cx={centerX} cy={centerY} r={radius} stroke="black" strokeWidth="1" fill="none" />
        <line x1={centerX} y1="0" x2={centerX} y2="300" stroke="gray" strokeWidth="1" />
        <line x1="0" y1={centerY} x2="300" y2={centerY} stroke="gray" strokeWidth="1" />
        <line x1={centerX} y1={centerY} x2={x} y2={y} stroke="red" strokeWidth="2" />
        <circle cx={x} cy={y} r="5" fill="red" />
        <text x={x + 10} y={y - 10} fontSize="12">{`(${cosValue.toFixed(2)}, ${sinValue.toFixed(2)})`}</text>
      </svg>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Unit Circle Calculator</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="angle">
            Angle (degrees):
          </label>
          <input
            id="angle"
            type="number"
            value={angle}
            onChange={handleAngleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-bold">Sin(θ):</p>
            <p>{sinValue.toFixed(4)}</p>
          </div>
          <div>
            <p className="font-bold">Cos(θ):</p>
            <p>{cosValue.toFixed(4)}</p>
          </div>
          <div>
            <p className="font-bold">Tan(θ):</p>
            <p>{tanValue.toFixed(4)}</p>
          </div>
        </div>
        {renderUnitCircle()}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">How to use:</h2>
        <ul className="list-disc pl-5">
          <li>Enter an angle in degrees in the input field.</li>
          <li>The calculator will display the sine, cosine, and tangent values for that angle.</li>
          <li>The unit circle diagram will update to show the position of the angle on the circle.</li>
          <li>The red dot represents the point (cos θ, sin θ) on the unit circle.</li>
          <li>Remember that the unit circle has a radius of 1, centered at (0, 0).</li>
        </ul>
      </div>
    </div>
  );
};

export default UnitCircleCalculator;