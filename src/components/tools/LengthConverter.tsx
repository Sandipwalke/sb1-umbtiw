import React, { useState, useEffect } from 'react';

const units = [
  { value: 'mm', label: 'Millimeters (mm)' },
  { value: 'cm', label: 'Centimeters (cm)' },
  { value: 'm', label: 'Meters (m)' },
  { value: 'km', label: 'Kilometers (km)' },
  { value: 'in', label: 'Inches (in)' },
  { value: 'ft', label: 'Feet (ft)' },
  { value: 'yd', label: 'Yards (yd)' },
  { value: 'mi', label: 'Miles (mi)' },
];

const conversionFactors: { [key: string]: number } = {
  mm: 1,
  cm: 10,
  m: 1000,
  km: 1000000,
  in: 25.4,
  ft: 304.8,
  yd: 914.4,
  mi: 1609344,
};

const LengthConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('cm');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    convertLength();
  }, [fromValue, fromUnit, toUnit]);

  const convertLength = () => {
    if (fromValue === '') {
      setResult('');
      return;
    }

    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) {
      setResult('Invalid input');
      return;
    }

    const mmValue = inputValue * conversionFactors[fromUnit];
    const outputValue = mmValue / conversionFactors[toUnit];
    setResult(outputValue.toFixed(6));
  };

  return (
    <div className="apple-card">
      <h1 className="text-2xl font-semibold mb-4">Length Converter</h1>
      <div className="mb-4">
        <input
          type="number"
          value={fromValue}
          onChange={(e) => setFromValue(e.target.value)}
          className="apple-input mr-2"
          placeholder="Enter value"
        />
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="apple-select mt-2"
        >
          {units.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <span className="block text-gray-700 mb-2">To:</span>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="apple-select"
        >
          {units.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Result:</strong> <span className="text-blue-500 font-semibold">{result}</span> {toUnit}
      </div>
    </div>
  );
};

export default LengthConverter;