import React, { useState, useRef } from 'react';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const speak = () => {
    if (!text) {
      alert('Please enter some text to speak');
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser');
    }
  };

  const stop = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Text to Speech</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to convert to speech..."
      />
      <div className="flex space-x-2">
        <button
          onClick={speak}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isSpeaking}
        >
          {isSpeaking ? 'Speaking...' : 'Speak'}
        </button>
        <button
          onClick={stop}
          className="bg-red-500 text-white px-4 py-2 rounded"
          disabled={!isSpeaking}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;