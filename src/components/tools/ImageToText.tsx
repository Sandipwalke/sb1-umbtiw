import React, { useState, useCallback } from 'react';
import { createWorker } from 'tesseract.js';

const ImageToText: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setExtractedText('');
      setProgress(0);
    }
  };

  const extractText = useCallback(async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);

    const worker = await createWorker();

    try {
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const result = await worker.recognize(selectedFile);
      setExtractedText(result.data.text);
    } catch (error) {
      console.error('Error during OCR:', error);
      setExtractedText('An error occurred during text extraction. Please try again.');
    } finally {
      await worker.terminate();
      setIsProcessing(false);
      setProgress(100);
    }
  }, [selectedFile]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image to Text (OCR)</h1>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={extractText}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={!selectedFile || isProcessing}
      >
        {isProcessing ? 'Extracting Text...' : 'Extract Text'}
      </button>
      
      {isProcessing && (
        <div className="mt-4">
          <p>Processing...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{width: `${progress}%`}}
            ></div>
          </div>
        </div>
      )}

      {extractedText && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Extracted Text:</h2>
          <textarea
            value={extractedText}
            readOnly
            className="w-full h-60 p-2 border rounded"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(extractedText);
            }}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageToText;
