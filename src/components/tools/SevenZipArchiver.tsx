import React, { useState, useEffect } from 'react';
import SevenZip from '7z-wasm';
import wasmUrl from '/7zz.wasm?url';

const SevenZipArchiver: React.FC = () => {
  const [sevenZip, setSevenZip] = useState<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionStatus, setCompressionStatus] = useState('');

  useEffect(() => {
    const initSevenZip = async () => {
      try {
        const sevenZipInstance = await SevenZip({
          locateFile: (path: string) => {
            if (path.endsWith('.wasm')) {
              return wasmUrl;
            }
            return path;
          }
        });
        setSevenZip(sevenZipInstance);
        console.log('7-Zip initialized successfully');
      } catch (error) {
        console.error('Failed to initialize 7-Zip:', error);
      }
    };

    initSevenZip();
  }, []);

  useEffect(() => {
    if (sevenZip) {
      console.log('SevenZip object:', sevenZip);
      console.log('Type of sevenZip:', typeof sevenZip);
      console.log('Properties of sevenZip:', Object.getOwnPropertyNames(sevenZip));
      
      if (typeof sevenZip === 'object') {
        Object.keys(sevenZip).forEach(key => {
          console.log(`${key}:`, typeof sevenZip[key]);
        });
      }
    }
  }, [sevenZip]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleCompression = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!sevenZip || files.length === 0) {
      console.error('7-Zip not initialized or no files selected');
      return;
    }

    try {
      setIsCompressing(true);
      setCompressionStatus('Compressing files...');

      const archiveName = 'compressed_archive.7z';

      // Create a virtual filesystem
      const FS = sevenZip.FS;

      // Write files to the virtual filesystem
      for (const file of files) {
        const fileData = new Uint8Array(await file.arrayBuffer());
        FS.writeFile(file.name, fileData);
      }

      // Compress the files
      sevenZip.callMain(['a', archiveName, ...files.map(file => file.name)]);

      // Read the compressed archive
      const compressedData = FS.readFile(archiveName);

      // Create a Blob from the compressed data
      const blob = new Blob([compressedData], { type: 'application/x-7z-compressed' });

      // Create a download link and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = archiveName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setCompressionStatus('Compression completed. File downloaded.');
    } catch (error) {
      console.error('Compression failed:', error);
      setCompressionStatus(`Compression failed: ${error.message}`);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div>
      <h2>Compress Files</h2>
      <form onSubmit={handleCompression}>
        <input 
          type="file" 
          multiple 
          onChange={handleFileChange} 
          accept=".txt,.pdf,.doc,.docx,.jpg,.png"
          disabled={isCompressing}
        />
        <button type="submit" disabled={!sevenZip || files.length === 0 || isCompressing}>
          {isCompressing ? 'Compressing...' : 'Compress Files'}
        </button>
      </form>
      {files.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      {compressionStatus && <p>{compressionStatus}</p>}
    </div>
  );
};

export default SevenZipArchiver;
