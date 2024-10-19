import React, { useState, useEffect } from 'react';

const units = [
  { value: 'ml', label: 'Milliliters (ml)' },
  { value: 'l', label: 'Liters (l)' },
  { value: 'm3', label: 'Cubic Meters (m³)' },
  { value: 'in3', label: 'Cubic Inches (in³)' },
  { value: 'ft3', label: 'Cubic Feet (ft³)' },
  { value: 'gal', label: 'Gallons (US)' },
  { value: 'qt', label: 'Quarts (US)' },
  { value: 'pt', label: 'Pints (US)' },
  { value: 'cup', label: 'Cups (US)' },
];

const conversionFactors: { [key: string]: number } = {
  ml: 1,
  l: 1000,
  m3: 1000000,
  in3: 16.387064,
  ft3: 28316.846592,
  gal: 3785.411784,
  qt: 946.352946,
  pt: 473.176473,
  cup: 236.588236,
};

const VolumeConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('l');
  const [toUnit, setToUnit] = useState<string>('gal');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    convertVolume();
  }, [fromValue, fromUnit, toUnit]);

  const convertVolume = () => {
    if (fromValue === '') {
      setResult('');
      return;
    }

    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) {
      setResult('Invalid input');
      return;
    }

    const mlValue = inputValue * conversionFactors[fromUnit];
    const outputValue = mlValue / conversionFactors[toUnit];
    setResult(outputValue.toFixed(6));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Volume Converter</h1>
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

export default VolumeConverter;