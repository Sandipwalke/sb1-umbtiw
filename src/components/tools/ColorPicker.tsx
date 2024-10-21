import React, { useState } from 'react';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#000000');
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    updateRgb(newColor);
  };

  const updateRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    setRgb({ r, g, b });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Color Picker</h1>
      <div className="mb-4">
        <label className="block mb-2">Select a Color:</label>
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-full h-12 cursor-pointer"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Color Information:</h2>
        <p><strong>HEX:</strong> {color}</p>
        <p><strong>RGB:</strong> rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Color Preview:</h2>
        <div
          className="w-full h-32 border border-gray-300"
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How to use:</h2>
        <ul className="list-disc pl-5">
          <li>Click on the color input to open the color picker</li>
          <li>Select a color using the color picker interface</li>
          <li>The selected color's HEX and RGB values will be displayed</li>
          <li>A preview of the selected color will be shown below</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorPicker;