import React, { useState } from 'react';

const TextFileConverter: React.FC = () => {
  const [textFile, setTextFile] = useState<File | null>(null);
  const [convertedText, setConvertedText] = useState<string>('');
  const [encoding, setEncoding] = useState<string>('utf-8');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTextFile(e.target.files[0]);
    }
  };

  const convertTextFile = () => {
    if (!textFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setConvertedText(text);
    };
    reader.readAsText(textFile, encoding);
  };

  const downloadConvertedText = () => {
    const blob = new Blob([convertedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.txt';
    a.click();
  };

  return (
    <div>
      <h1>Text File Converter</h1>
      <p>This tool allows you to convert text files between different formats and encodings.</p>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="mb-4"
      />
      <div className="mb-4">
        <label htmlFor="encoding">Select Encoding:</label>
        <select
          id="encoding"
          value={encoding}
          onChange={(e) => setEncoding(e.target.value)}
          className="ml-2"
        >
          <option value="utf-8">UTF-8</option>
          <option value="utf-16">UTF-16</option>
          <option value="iso-8859-1">ISO-8859-1</option>
          {/* Add more encodings as needed */}
        </select>
      </div>
      <button
        onClick={convertTextFile}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={!textFile}
      >
        Convert Text File
      </button>
      {convertedText && (
        <div>
          <h2>Converted Text:</h2>
          <pre className="border p-2">{convertedText}</pre>
          <button
            onClick={downloadConvertedText}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Download Converted Text
          </button>
        </div>
      )}
    </div>
  );
};

export default TextFileConverter;
