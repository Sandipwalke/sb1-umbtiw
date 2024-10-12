import React, { useState } from 'react';
import Papa from 'papaparse';

const JsonToCsv: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  const convertJsonToCsv = () => {
    if (!jsonInput) {
      alert('Please enter some JSON to convert');
      return;
    }

    try {
      const jsonData = JSON.parse(jsonInput);
      
      if (!Array.isArray(jsonData)) {
        throw new Error('Input must be an array of objects');
      }

      const csv = Papa.unparse(jsonData);
      setCsvOutput(csv);
    } catch (error) {
      alert(`Error converting JSON to CSV: ${error.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">JSON to CSV</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={jsonInput}
        onChange={handleJsonChange}
        placeholder="Enter JSON here..."
      />
      <button
        onClick={convertJsonToCsv}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Convert to CSV
      </button>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={csvOutput}
        readOnly
        placeholder="Converted CSV will appear here..."
      />
    </div>
  );
};

export default JsonToCsv;