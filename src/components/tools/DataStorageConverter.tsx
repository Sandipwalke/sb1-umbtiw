import React, { useState, useEffect } from 'react';

const units = [
  { value: 'b', label: 'Bits (b)' },
  { value: 'B', label: 'Bytes (B)' },
  { value: 'KB', label: 'Kilobytes (KB)' },
  { value: 'MB', label: 'Megabytes (MB)' },
  { value: 'GB', label: 'Gigabytes (GB)' },
  { value: 'TB', label: 'Terabytes (TB)' },
  { value: 'PB', label: 'Petabytes (PB)' },
];

const conversionFactors: { [key: string]: number } = {
  b: 1 / 8,
  B: 1,
  KB: 1024,
  MB: 1048576,
  GB: 1073741824,
  TB: 1099511627776,
  PB: 1125899906842624,
};

const DataStorageConverter: React.FC = () => {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('MB');
  const [toUnit, setToUnit] = useState<string>('GB');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    convertDataStorage();
  }, [fromValue, fromUnit, toUnit]);

  const convertDataStorage = () => {
    if (fromValue === '') {
      setResult('');
      return;
    }

    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) {
      setResult('Invalid input');
      return;
    }

    const bytes = inputValue * conversionFactors[fromUnit];
    const outputValue = bytes / conversionFactors[toUnit];
    setResult(outputValue.toExponential(6));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Storage Converter</h1>
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

export default DataStorageConverter;