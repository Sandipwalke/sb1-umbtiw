import React, { useState, useEffect } from 'react';

const units = [
  { value: 'J', label: 'Joules (J)' },
  { value: 'kJ', label: 'Kilojoules (kJ)' },
  { value: 'cal', label: 'Calories (cal)' },
  { value: 'kcal', label: 'Kilocalories (kcal)' },
  { value: 'Wh', label: 'Watt-hours (Wh)' },
  { value: 'kWh', label: 'Kilowatt-hours (kWh)' },
  { value: 'eV', label: 'Electron volts (eV)' },
  { value: 'BTU', label: 'British Thermal Units (BTU)' },
];

const conversionFactors: { [key: string]: number } = {
  J: 1,
  kJ: 1000,
  cal: 4.184,
  kcal: 4184,
  Wh: 3600,
  kWh: 3600000,
  eV: 1.602176634e-19,
  BTU: 1055.06,
};

const EnergyConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('J');
  const [toUnit, setToUnit] = useState<string>('kWh');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    convertEnergy();
  }, [fromValue, fromUnit, toUnit]);

  const convertEnergy = () => {
    if (fromValue === '') {
      setResult('');
      return;
    }

    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) {
      setResult('Invalid input');
      return;
    }

    const joules = inputValue * conversionFactors[fromUnit];
    const outputValue = joules / conversionFactors[toUnit];
    setResult(outputValue.toExponential(6));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Energy Converter</h1>
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

export default EnergyConverter;