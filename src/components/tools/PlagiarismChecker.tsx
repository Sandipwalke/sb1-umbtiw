import React, { useState } from 'react';
import axios from 'axios';

const PlagiarismChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{percentage: number, matches: any[]} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const checkPlagiarism = async () => {
    if (!text) {
      alert('Please enter some text to check for plagiarism');
      return;
    }

    setIsLoading(true);

    try {
      // Replace this with your actual API endpoint and key
      const response = await axios.post('https://api.example.com/plagiarism-check', {
        text: text
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        }
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error checking plagiarism:', error);
      alert('An error occurred while checking for plagiarism. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Plagiarism Checker</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to check for plagiarism..."
      />
      <button
        onClick={checkPlagiarism}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={isLoading}
      >
        {isLoading ? 'Checking...' : 'Check Plagiarism'}
      </button>
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <p>Plagiarism Percentage: {result.percentage}%</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Matches:</h3>
          <ul className="list-disc pl-5">
            {result.matches.map((match, index) => (
              <li key={index} className="mb-2">
                <p><strong>Source:</strong> {match.source}</p>
                <p><strong>Matched Text:</strong> {match.matchedText}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;