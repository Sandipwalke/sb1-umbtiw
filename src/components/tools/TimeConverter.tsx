import React, { useState, useEffect } from 'react';

const units = [
  { value: 'ms', label: 'Milliseconds' },
  { value: 's', label: 'Seconds' },
  { value: 'min', label: 'Minutes' },
  { value: 'h', label: 'Hours' },
  { value: 'd', label: 'Days' },
  { value: 'wk', label: 'Weeks' },
  { value: 'mo', label: 'Months (30 days)' },
  { value: 'yr', label: 'Years (365 days)' },
];

const conversionFactors: { [key: string]: number } = {
  ms: 1,
  s: 1000,
  min: 60000,
  h: 3600000,
  d: 86400000,
  wk: 604800000,
  mo: 2592000000,
  yr: 31536000000,
};

const TimeConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('h');
  const [toUnit, setToUnit] = useState<string>('min');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    convertTime();
  }, [fromValue, fromUnit, toUnit]);

  const convertTime = () => {
    if (fromValue === '') {
      setResult('');
      return;
    }

    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) {
      setResult('Invalid input');
      return;
    }

    const msValue = inputValue * conversionFactors[fromUnit];
    const outputValue = msValue / conversionFactors[toUnit];
    setResult(outputValue.toFixed(6));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Time Converter</h1>
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

export default TimeConverter;