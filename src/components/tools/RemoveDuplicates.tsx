import React, { useState } from 'react';

const RemoveDuplicates: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'lines' | 'words'>('lines');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const removeDuplicates = () => {
    if (mode === 'lines') {
      const uniqueLines = Array.from(new Set(text.split('\n')));
      setResult(uniqueLines.join('\n'));
    } else {
      const words = text.split(/\s+/);
      const uniqueWords = Array.from(new Set(words));
      setResult(uniqueWords.join(' '));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Remove Duplicates</h1>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="lines"
            checked={mode === 'lines'}
            onChange={() => setMode('lines')}
          />
          Remove Duplicate Lines
        </label>
        <label>
          <input
            type="radio"
            value="words"
            checked={mode === 'words'}
            onChange={() => setMode('words')}
          />
          Remove Duplicate Words
        </label>
      </div>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your text here..."
      />
      <button
        onClick={removeDuplicates}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Remove Duplicates
      </button>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={result}
        readOnly
        placeholder="Result will appear here..."
      />
    </div>
  );
};

export default RemoveDuplicates;