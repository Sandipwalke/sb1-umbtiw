import React, { useState } from 'react';
import { loremIpsum } from 'lorem-ipsum';

const LoremIpsumGenerator: React.FC = () => {
  const [paragraphs, setParagraphs] = useState(1);
  const [generatedText, setGeneratedText] = useState('');

  const handleParagraphsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setParagraphs(isNaN(value) ? 1 : Math.max(1, value));
  };

  const generateLoremIpsum = () => {
    const text = loremIpsum({
      count: paragraphs,
      format: 'plain',
      paragraphLowerBound: 3,
      paragraphUpperBound: 7,
      random: Math.random,
      sentenceLowerBound: 5,
      sentenceUpperBound: 15,
      suffix: '\n',
      units: 'paragraphs',
    });
    setGeneratedText(text);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lorem Ipsum Generator</h1>
      <div className="mb-4">
        <label htmlFor="paragraphs" className="block mb-2">Number of Paragraphs:</label>
        <input
          type="number"
          id="paragraphs"
          className="w-full p-2 border border-gray-300 rounded"
          value={paragraphs}
          onChange={handleParagraphsChange}
          min="1"
        />
      </div>
      <button
        onClick={generateLoremIpsum}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Generate Lorem Ipsum
      </button>
      <textarea
        className="w-full h-60 p-2 border border-gray-300 rounded"
        value={generatedText}
        readOnly
        placeholder="Generated Lorem Ipsum will appear here..."
      />
    </div>
  );
};

export default LoremIpsumGenerator;