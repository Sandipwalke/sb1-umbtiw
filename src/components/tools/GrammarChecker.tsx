import React, { useState } from 'react';

const GrammarChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const checkGrammar = () => {
    if (!text) {
      alert('Please enter some text to check');
      return;
    }

    const simpleGrammarRules = [
      { regex: /\b(its|it's)\b/g, message: "Check the usage of 'its' (possessive) vs 'it's' (it is)" },
      { regex: /\b(your|you're)\b/g, message: "Check the usage of 'your' (possessive) vs 'you're' (you are)" },
      { regex: /\b(there|their|they're)\b/g, message: "Check the usage of 'there', 'their', and 'they're'" },
      { regex: /\b(to|too|two)\b/g, message: "Check the usage of 'to', 'too', and 'two'" },
      { regex: /\s+,/g, message: "No space before comma" },
      { regex: /\s+\./g, message: "No space before period" },
      { regex: /\b(a)\s+[aeiou]/gi, message: "Use 'an' before words starting with a vowel sound" },
    ];

    const newErrors: string[] = [];

    simpleGrammarRules.forEach(rule => {
      if (rule.regex.test(text)) {
        newErrors.push(rule.message);
      }
    });

    setErrors(newErrors);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Grammar Checker</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to check for grammar..."
      />
      <button
        onClick={checkGrammar}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Check Grammar
      </button>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Results:</h2>
        {errors.length > 0 ? (
          <ul className="list-disc pl-5">
            {errors.map((error, index) => (
              <li key={index} className="mb-2">
                {error}
              </li>
            ))}
          </ul>
        ) : (
          <p>No errors found or grammar hasn't been checked yet.</p>
        )}
      </div>
    </div>
  );
};

export default GrammarChecker;