import React, { useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [format, setFormat] = useState('CODE128');

  useEffect(() => {
    console.log('BarcodeGenerator component mounted');
  }, []);

  const generateBarcode = () => {
    try {
      JsBarcode("#barcode", text, {
        format: format,
        width: 2,
        height: 100,
        displayValue: true
      });
    } catch (error) {
      console.error('Error generating barcode:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Barcode Generator</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or number"
        className="w-full p-2 border rounded mb-4"
      />
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="CODE128">CODE128</option>
        <option value="EAN13">EAN-13</option>
        <option value="UPC">UPC</option>
        <option value="CODE39">CODE39</option>
      </select>
      <button
        onClick={generateBarcode}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Generate Barcode
      </button>
      <div className="mt-4 flex justify-center">
        <svg id="barcode"></svg>
      </div>
    </div>
  );
};

export default BarcodeGenerator;