import React, { useState, useEffect } from 'react';

const units = [
  { value: 'Pa', label: 'Pascal (Pa)' },
  { value: 'hPa', label: 'Hectopascal (hPa)' },
  { value: 'kPa', label: 'Kilopascal (kPa)' },
  { value: 'bar', label: 'Bar' },
  { value: 'atm', label: 'Atmosphere (atm)' },
  { value: 'mmHg', label: 'Millimeters of Mercury (mmHg)' },
  { value: 'inHg', label: 'Inches of Mercury (inHg)' },
  { value: 'psi', label: 'Pounds per Square Inch (psi)' },
];

const conversionFactors: { [key: string]: number } = {
  Pa: 1,
  hPa: 100,
  kPa: 1000,
  bar: 100000,
  atm: 101325,
  mmHg: 133.322,
  inHg: 3386.39,
  psi: 6894.76,
};

const PressureConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('bar');
  const [toUnit, setToUnit] = useState<string>('psi');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    convertPressure();
  }, [fromValue, fromUnit, toUnit]);

  const convertPressure = () => {
    if (fromValue === '') {
      setResult('');
      return;
    }

    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) {
      setResult('Invalid input');
      return;
    }

    const paValue = inputValue * conversionFactors[fromUnit];
    const outputValue = paValue / conversionFactors[toUnit];
    setResult(outputValue.toFixed(6));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pressure Converter</h1>
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

export default PressureConverter;