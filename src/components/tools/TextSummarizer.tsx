import React, { useState } from 'react';

const TextSummarizer: React.FC = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [sentences, setSentences] = useState(3);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSentencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setSentences(isNaN(value) ? 3 : Math.max(1, value));
  };

  const summarizeText = () => {
    if (!text) {
      alert('Please enter some text to summarize');
      return;
    }

    const allSentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
    const summarySentences = allSentences.slice(0, sentences);
    setSummary(summarySentences.join(' '));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Text Summarizer</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to summarize..."
      />
      <div className="mb-4">
        <label htmlFor="sentences" className="block mb-2">Number of Sentences in Summary:</label>
        <input
          type="number"
          id="sentences"
          className="w-full p-2 border border-gray-300 rounded"
          value={sentences}
          onChange={handleSentencesChange}
          min="1"
        />
      </div>
      <button
        onClick={summarizeText}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Summarize Text
      </button>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={summary}
        readOnly
        placeholder="Summary will appear here..."
      />
    </div>
  );
};

export default TextSummarizer;