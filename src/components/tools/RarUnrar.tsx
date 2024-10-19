import React, { useState, useEffect } from 'react';
import { FileUploader } from "react-drag-drop-files";
import * as LibArchiveJs from 'libarchive.js';
import { saveAs } from 'file-saver';

const RarUnrar: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<'compress' | 'extract'>('compress');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isLibArchiveAvailable, setIsLibArchiveAvailable] = useState(false);
  const maxFileSize = 100; // Size in MB

  useEffect(() => {
    const loadLibArchive = async () => {
      try {
        if (typeof LibArchiveJs.Archive === 'undefined') {
          console.error('Archive is not defined');
          return;
        }
        
        if (typeof LibArchiveJs.Archive.init === 'function') {
          await LibArchiveJs.Archive.init();
          console.log('LibArchive initialized successfully');
          setIsLibArchiveAvailable(true);
        } else {
          console.error('Archive.init is not a function');
        }
      } catch (error) {
        console.error('Error initializing LibArchive:', error);
      }
    };

    loadLibArchive();
  }, []);

  const handleFileChange = (newFiles: File | File[]) => {
    if (newFiles) {
      const fileArray = Array.isArray(newFiles) ? newFiles : [newFiles];
      const validFiles = fileArray.filter((file): file is File => file instanceof File);
      setFiles(validFiles);
      setResult(null);
      console.log('Files selected:', validFiles.length);
    } else {
      setFiles([]);
      console.log('No files selected');
    }
  };

  const handleModeChange = (newMode: 'compress' | 'extract') => {
    setMode(newMode);
    setFiles([]);
    setResult(null);
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof File)) {
        reject(new Error('Invalid file object'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result instanceof ArrayBuffer) {
          resolve(e.target.result);
        } else {
          reject(new Error('Failed to read file as ArrayBuffer'));
        }
      };
      reader.onerror = (e) => reject(new Error('FileReader error: ' + e.target?.error?.message));
      reader.readAsArrayBuffer(file);
    });
  };

  const processFiles = async () => {
    setIsProcessing(true);
    setResult(null);

    try {
      if (!isLibArchiveAvailable) {
        throw new Error('LibArchive is not available. Please try again later.');
      }

      if (files.length === 0) {
        throw new Error('No files selected. Please select file(s) to process.');
      }

      if (mode === 'compress') {
        console.log('Compressing files...');
        const archive = new LibArchiveJs.Archive('rar', { flags: 'create' });
        for (const file of files) {
          const arrayBuffer = await readFileAsArrayBuffer(file);
          await archive.addFile(file.name, new Uint8Array(arrayBuffer));
        }
        const blob = await archive.save('compressed.rar');
        saveAs(blob, 'compressed.rar');
        setResult(`Successfully compressed ${files.length} file(s).`);
      } else {
        console.log('Extracting files...');
        if (files.length !== 1) {
          throw new Error('Please select exactly one RAR file for extraction.');
        }
        const archive = await LibArchiveJs.Archive.open(files[0]);
        const extractedFiles = await archive.extractFiles();
        const fileList = extractedFiles.map(file => `<li>${file.file.name}</li>`).join('');
        setResult(`Successfully extracted ${extractedFiles.length} file(s):<ul>${fileList}</ul>`);
      }
    } catch (error) {
      console.error('Error processing files:', error);
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSizeError = (file: File) => {
    setResult(`File ${file.name} is too large. Maximum size is ${maxFileSize} MB.`);
  };

  const handleTypeError = (file: File) => {
    setResult(`File ${file.name} is not allowed in ${mode} mode.`);
  };

  const isProcessButtonDisabled = files.length === 0 || isProcessing || !isLibArchiveAvailable;

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
        types={mode === 'extract' ? ['rar'] : undefined}
        maxSize={maxFileSize}
        onSizeError={handleSizeError}
        onTypeError={handleTypeError}
      />

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Files:</h3>
          <ul className="list-disc pl-5">
            {files.map((file, index) => (
              <li key={index}>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={processFiles}
        disabled={isProcessButtonDisabled}
        className={`mt-4 px-4 py-2 rounded ${
          isProcessButtonDisabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isProcessing ? 'Processing...' : mode === 'compress' ? 'Compress to RAR' : 'Extract RAR'}
      </button>

      {!isLibArchiveAvailable && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <p className="text-yellow-700">LibArchive is not available. RAR functionality is disabled.</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
          <p className="text-green-700" dangerouslySetInnerHTML={{ __html: result }}></p>
        </div>
      )}
    </div>
  );
};

export default RarUnrar;
