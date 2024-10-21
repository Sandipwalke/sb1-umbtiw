import React, { useState } from 'react';

const Base64EncoderDecoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleEncodeDecode = () => {
    if (mode === 'encode') {
      setOutput(btoa(input));
    } else {
      try {
        setOutput(atob(input));
      } catch (error) {
        setOutput('Error: Invalid Base64 string');
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Base64 Encoder/Decoder</h1>
      <div className="mb-4">
        <label className="block mb-2">Mode:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as 'encode' | 'decode')}
          className="w-full p-2 border rounded"
        >
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Input:</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded h-40"
          placeholder={mode === 'encode' ? 'Enter text to encode' : 'Enter Base64 to decode'}
        />
      </div>
      <button
        onClick={handleEncodeDecode}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {mode === 'encode' ? 'Encode' : 'Decode'}
      </button>
      {output && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Output:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default Base64EncoderDecoder;