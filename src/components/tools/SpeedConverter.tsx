import React, { useState, useEffect } from 'react';

const units = [
  { value: 'mps', label: 'Meters per Second (m/s)' },
  { value: 'kph', label: 'Kilometers per Hour (km/h)' },
  { value: 'mph', label: 'Miles per Hour (mph)' },
  { value: 'fps', label: 'Feet per Second (ft/s)' },
  { value: 'knot', label: 'Knots' },
];

const conversionFactors: { [key: string]: number } = {
  mps: 1,
  kph: 3.6,
  mph: 2.23693629,
  fps: 3.28084,
  knot: 1.94384449,
};

const SpeedConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('kph');
  const [toUnit, setToUnit] = useState<string>('mph');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    convertSpeed();
  }, [fromValue, fromUnit, toUnit]);

  const convertSpeed = () => {
    if (fromValue === '') {
      setResult('');
      return;
    }

    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) {
      setResult('Invalid input');
      return;
    }

    const mpsValue = inputValue / conversionFactors[fromUnit];
    const outputValue = mpsValue * conversionFactors[toUnit];
    setResult(outputValue.toFixed(6));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Speed Converter</h1>
      <div className="mb-4">
        <input
          type="number"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter value"
        />
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="border p-2"
        >
          {units.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <span className="mr-2">To:</span>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="border p-2"
        >
          {units.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <strong>Result:</strong> {result} {toUnit}
      </div>
    </div>
  );
};

export default SpeedConverter;