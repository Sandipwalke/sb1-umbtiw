import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const TextEncryption: React.FC = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const handleEncryptDecrypt = () => {
    if (!text || !key) {
      alert('Please enter both text and key');
      return;
    }

    try {
      if (mode === 'encrypt') {
        const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        setResult(encrypted);
      } else {
        const decrypted = CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
        setResult(decrypted);
      }
    } catch (error) {
      alert('Error occurred during encryption/decryption. Please check your input.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Text Encryption (AES-256)</h1>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="encrypt"
            checked={mode === 'encrypt'}
            onChange={() => setMode('encrypt')}
          />
          Encrypt
        </label>
        <label>
          <input
            type="radio"
            value="decrypt"
            checked={mode === 'decrypt'}
            onChange={() => setMode('decrypt')}
          />
          Decrypt
        </label>
      </div>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={text}
        onChange={handleTextChange}
        placeholder={mode === 'encrypt' ? "Enter text to encrypt..." : "Enter text to decrypt..."}
      />
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={key}
        onChange={handleKeyChange}
        placeholder="Enter encryption/decryption key"
      />
      <button
        onClick={handleEncryptDecrypt}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
      </button>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={result}
        readOnly
        placeholder="Result will appear here..."
      />
    </div>
  );
};

export default TextEncryption;