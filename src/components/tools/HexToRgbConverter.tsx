import React, { useState } from 'react';

const HexToRgbConverter: React.FC = () => {
  const [hexColor, setHexColor] = useState('');
  const [rgbColor, setRgbColor] = useState('');
  const [error, setError] = useState('');

  const hexToRgb = (hex: string): string | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : null;
  };

  const handleConvert = () => {
    setError('');
    const rgb = hexToRgb(hexColor);
    if (rgb) {
      setRgbColor(rgb);
    } else {
      setError('Invalid HEX color code');
      setRgbColor('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">HEX to RGB Converter</h1>
      <div className="mb-4">
        <label className="block mb-2">Enter HEX Color:</label>
        <input
          type="text"
          value={hexColor}
          onChange={(e) => setHexColor(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="#000000 or 000000"
        />
      </div>
      <button
        onClick={handleConvert}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Convert to RGB
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {rgbColor && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">RGB Color:</h2>
          <p className="text-lg">{rgbColor}</p>
          <div
            className="w-20 h-20 mt-2 border border-gray-300"
            style={{ backgroundColor: rgbColor }}
          ></div>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc pl-5">
          <li>Enter a valid HEX color code (with or without the # symbol)</li>
          <li>The converter supports both 3-digit and 6-digit HEX codes</li>
          <li>Click "Convert to RGB" to see the equivalent RGB value</li>
          <li>A color preview will be shown below the result</li>
        </ul>
      </div>
    </div>
  );
};

export default HexToRgbConverter;