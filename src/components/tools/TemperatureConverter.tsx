import React, { useState, useEffect } from 'react';

const units = [
  { value: 'C', label: 'Celsius (°C)' },
  { value: 'F', label: 'Fahrenheit (°F)' },
  { value: 'K', label: 'Kelvin (K)' },
];

const TemperatureConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('C');
  const [toUnit, setToUnit] = useState<string>('F');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    convertTemperature();
  }, [fromValue, fromUnit, toUnit]);

  const convertTemperature = () => {
    if (fromValue === '') {
      setResult('');
      return;
    }

    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) {
      setResult('Invalid input');
      return;
    }

    let outputValue: number;

    if (fromUnit === toUnit) {
      outputValue = inputValue;
    } else if (fromUnit === 'C') {
      if (toUnit === 'F') {
        outputValue = (inputValue * 9) / 5 + 32;
      } else {
        outputValue = inputValue + 273.15;
      }
    } else if (fromUnit === 'F') {
      if (toUnit === 'C') {
        outputValue = ((inputValue - 32) * 5) / 9;
      } else {
        outputValue = ((inputValue - 32) * 5) / 9 + 273.15;
      }
    } else {
      if (toUnit === 'C') {
        outputValue = inputValue - 273.15;
      } else {
        outputValue = ((inputValue - 273.15) * 9) / 5 + 32;
      }
    }

    setResult(outputValue.toFixed(2));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Temperature Converter</h1>
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
        <strong>Result:</strong> {result} {toUnit === 'K' ? 'K' : `°${toUnit}`}
      </div>
    </div>
  );
};

export default TemperatureConverter;