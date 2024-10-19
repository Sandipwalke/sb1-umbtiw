import React, { useState, useEffect } from 'react';
import { FileUploader } from "react-drag-drop-files";
import * as LibArchiveJs from 'libarchive.js';

const RarUnrar: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<'compress' | 'extract'>('compress');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    LibArchiveJs.load();
  }, []);

  const handleFileChange = (newFiles: FileList) => {
    setFiles(Array.from(newFiles));
    setResult(null);
  };

  const handleModeChange = (newMode: 'compress' | 'extract') => {
    setMode(newMode);
    setFiles([]);
    setResult(null);
  };

  const processFiles = async () => {
    setIsProcessing(true);
    setResult(null);

    try {
      if (mode === 'compress') {
        const archive = await LibArchiveJs.Archive.open('compressed.rar');
        for (const file of files) {
          const arrayBuffer = await file.arrayBuffer();
          await archive.addFile(file.name, new Uint8Array(arrayBuffer));
        }
        const compressedData = await archive.writeData();
        const blob = new Blob([compressedData], { type: 'application/x-rar-compressed' });
        const url = URL.createObjectURL(blob);
        setResult(`Successfully compressed ${files.length} file(s). <a href="${url}" download="compressed.rar">Download RAR</a>`);
      } else {
        const archive = await LibArchiveJs.Archive.open(files[0]);
        const extractedFiles = await archive.extractFiles();
        const fileList = extractedFiles.map(file => `<li>${file.file.name}</li>`).join('');
        setResult(`Successfully extracted ${extractedFiles.length} file(s):<ul>${fileList}</ul>`);
      }
    } catch (error) {
      console.error('Error processing files:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">RAR/UnRAR Files</h1>
      
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="compress"
            checked={mode === 'compress'}
            onChange={() => handleModeChange('compress')}
            className="mr-2"
          />
          Compress to RAR
        </label>
        <label>
          <input
            type="radio"
            value="extract"
            checked={mode === 'extract'}
            onChange={() => handleModeChange('extract')}
            className="mr-2"
          />
          Extract RAR
        </label>
      </div>

      <FileUploader
        multiple={mode === 'compress'}
        handleChange={handleFileChange}
        name="file"
        types={mode === 'extract' ? ['rar'] : ['*']}
      />

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
          <ul className="list-disc pl-5">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={processFiles}
        disabled={files.length === 0 || isProcessing}
        className={`mt-4 px-4 py-2 rounded ${
          files.length === 0 || isProcessing
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isProcessing ? 'Processing...' : mode === 'compress' ? 'Compress to RAR' : 'Extract RAR'}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <p className="text-green-700" dangerouslySetInnerHTML={{ __html: result }}></p>
        </div>
      )}
    </div>
  );
};

export default RarUnrar;
