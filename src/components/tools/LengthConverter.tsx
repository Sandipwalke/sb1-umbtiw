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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Length Converter</h1>
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

export default LengthConverter;