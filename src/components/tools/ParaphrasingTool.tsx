import React, { useState } from 'react';
import axios from 'axios';

const ParaphrasingTool: React.FC = () => {
  const [text, setText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const paraphraseText = async () => {
    if (!text) {
      alert('Please enter some text to paraphrase');
      return;
    }

    setIsLoading(true);

    try {
      // Replace this with your actual API endpoint and key
      const response = await axios.post('https://api.example.com/paraphrase', {
        text: text
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        }
      });

      setParaphrasedText(response.data.paraphrased_text);
    } catch (error) {
      console.error('Error paraphrasing text:', error);
      alert('An error occurred while paraphrasing the text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Paraphrasing Tool</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to paraphrase..."
      />
      <button
        onClick={paraphraseText}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={isLoading}
      >
        {isLoading ? 'Paraphrasing...' : 'Paraphrase Text'}
      </button>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={paraphrasedText}
        readOnly
        placeholder="Paraphrased text will appear here..."
      />
    </div>
  );
};

export default ParaphrasingTool;