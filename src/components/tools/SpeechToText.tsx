import React, { useState, useRef } from 'react';

const SpeechToText: React.FC = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');

        setText(prevText => prevText + transcript);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Speech to Text</h1>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={startListening}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isListening}
        >
          {isListening ? 'Listening...' : 'Start Listening'}
        </button>
        <button
          onClick={stopListening}
          className="bg-red-500 text-white px-4 py-2 rounded"
          disabled={!isListening}
        >
          Stop Listening
        </button>
      </div>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Spoken text will appear here..."
        readOnly
      />
    </div>
  );
};

export default SpeechToText;