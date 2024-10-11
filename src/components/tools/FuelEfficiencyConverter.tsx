import React, { useState, useEffect } from 'react';

const units = [
  { value: 'mpg', label: 'Miles per Gallon (US)' },
  { value: 'mpg_imp', label: 'Miles per Gallon (UK)' },
  { value: 'km_l', label: 'Kilometers per Liter' },
  { value: 'l_100km', label: 'Liters per 100 Kilometers' },
];

const FuelEfficiencyConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('mpg');
  const [toUnit, setToUnit] = useState<string>('km_l');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    convertFuelEfficiency();
  }, [fromValue, fromUnit, toUnit]);

  const convertFuelEfficiency = () => {
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

    // Convert to L/100km first
    let l100km: number;
    if (fromUnit === 'mpg') {
      l100km = 235.214583 / inputValue;
    } else if (fromUnit === 'mpg_imp') {
      l100km = 282.48 / inputValue;
    } else if (fromUnit === 'km_l') {
      l100km = 100 / inputValue;
    } else {
      l100km = inputValue;
    }

    // Convert from L/100km to the target unit
    if (toUnit === 'mpg') {
      outputValue = 235.214583 / l100km;
    } else if (toUnit === 'mpg_imp') {
      outputValue = 282.48 / l100km;
    } else if (toUnit === 'km_l') {
      outputValue = 100 / l100km;
    } else {
      outputValue = l100km;
    }

    setResult(outputValue.toFixed(2));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fuel Efficiency Converter</h1>
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
        <strong>Result:</strong> {result} {units.find(u => u.value === toUnit)?.label}
      </div>
    </div>
  );
};

export default FuelEfficiencyConverter;