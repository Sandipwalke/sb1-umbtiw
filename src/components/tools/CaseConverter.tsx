import React, { useState } from 'react';

const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [convertedText, setConvertedText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const convertCase = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
    switch (type) {
      case 'upper':
        setConvertedText(text.toUpperCase());
        break;
      case 'lower':
        setConvertedText(text.toLowerCase());
        break;
      case 'title':
        setConvertedText(
          text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        );
        break;
      case 'sentence':
        setConvertedText(
          text.replace(/(^\w|\.\s+\w)/gm, (txt) => txt.toUpperCase())
        );
        break;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Case Converter</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your text here..."
      />
      <div className="flex space-x-2 mb-4">
        <button onClick={() => convertCase('upper')} className="bg-blue-500 text-white px-4 py-2 rounded">
          UPPERCASE
        </button>
        <button onClick={() => convertCase('lower')} className="bg-blue-500 text-white px-4 py-2 rounded">
          lowercase
        </button>
        <button onClick={() => convertCase('title')} className="bg-blue-500 text-white px-4 py-2 rounded">
          Title Case
        </button>
        <button onClick={() => convertCase('sentence')} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sentence case
        </button>
      </div>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={convertedText}
        readOnly
        placeholder="Converted text will appear here..."
      />
    </div>
  );
};

export default CaseConverter;