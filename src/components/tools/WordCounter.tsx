import React, { useState } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const countWords = (input: string) => {
    const trimmedText = input.trim();
    const words = trimmedText ? trimmedText.split(/\s+/) : [];
    return words.length;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setWordCount(countWords(newText));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Word Counter</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your text here..."
      />
      <p className="mt-4">
        Word count: <span className="font-bold">{wordCount}</span>
      </p>
    </div>
  );
};

export default WordCounter;