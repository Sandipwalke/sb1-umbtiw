import React, { useState } from 'react';

const JsonFormatter: React.FC = () => {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    setError('');
    try {
      const parsedJson = JSON.parse(inputJson);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setOutputJson(formattedJson);
    } catch (err) {
      setError('Invalid JSON. Please check your input.');
      setOutputJson('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">JSON Formatter/Viewer</h1>
      <div className="mb-4">
        <label className="block mb-2">Input JSON:</label>
        <textarea
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          className="w-full p-2 border rounded h-40"
          placeholder="Paste your JSON here"
        />
      </div>
      <button
        onClick={formatJson}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Format JSON
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {outputJson && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Formatted JSON:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{outputJson}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default JsonFormatter;