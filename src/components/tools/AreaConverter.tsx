import React, { useState, useEffect } from 'react';

const units = [
  { value: 'mm2', label: 'Square Millimeters (mm²)' },
  { value: 'cm2', label: 'Square Centimeters (cm²)' },
  { value: 'm2', label: 'Square Meters (m²)' },
  { value: 'km2', label: 'Square Kilometers (km²)' },
  { value: 'in2', label: 'Square Inches (in²)' },
  { value: 'ft2', label: 'Square Feet (ft²)' },
  { value: 'yd2', label: 'Square Yards (yd²)' },
  { value: 'ac', label: 'Acres' },
  { value: 'ha', label: 'Hectares' },
];

const conversionFactors: { [key: string]: number } = {
  mm2: 1,
  cm2: 100,
  m2: 1000000,
  km2: 1000000000000,
  in2: 645.16,
  ft2: 92903.04,
  yd2: 836127.36,
  ac: 4046856422.4,
  ha: 10000000000,
};

const AreaConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('m2');
  const [toUnit, setToUnit] = useState<string>('ft2');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    convertArea();
  }, [fromValue, fromUnit, toUnit]);

  const convertArea = () => {
    if (fromValue === '') {
      setResult('');
      return;
    }

    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) {
      setResult('Invalid input');
      return;
    }

    const mm2Value = inputValue * conversionFactors[fromUnit];
    const outputValue = mm2Value / conversionFactors[toUnit];
    setResult(outputValue.toFixed(6));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Area Converter</h1>
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

export default AreaConverter;