import React, { useState } from 'react';

const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);

  const countCharacters = (input: string) => {
    return input.length;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(countCharacters(newText));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Character Counter</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your text here..."
      />
      <p className="mt-4">
        Character count: <span className="font-bold">{charCount}</span>
      </p>
    </div>
  );
};

export default CharacterCounter;