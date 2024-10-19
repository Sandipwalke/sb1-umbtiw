import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ZipUnzip: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [extractedFiles, setExtractedFiles] = useState<{ name: string; content: Blob }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleZipFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setZipFile(e.target.files[0]);
    }
  };

  const createZip = async () => {
    const zip = new JSZip();
    
    for (const file of files) {
      const content = await file.arrayBuffer();
      zip.file(file.name, content);
    }
    
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'compressed.zip');
  };

  const extractZip = async () => {
    if (!zipFile) return;

    const zip = new JSZip();
    const contents = await zip.loadAsync(zipFile);
    const extractedFiles: { name: string; content: Blob }[] = [];

    for (const [filename, file] of Object.entries(contents.files)) {
      if (!file.dir) {
        const content = await file.async('blob');
        extractedFiles.push({ name: filename, content });
      }
    }

    setExtractedFiles(extractedFiles);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ZIP/Unzip Files</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create ZIP</h2>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          className="mb-4"
        />
        <button
          onClick={createZip}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={files.length === 0}
        >
          Create ZIP
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Extract ZIP</h2>
        <input
          type="file"
          onChange={handleZipFileChange}
          accept=".zip"
          className="mb-4"
        />
        <button
          onClick={extractZip}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={!zipFile}
        >
          Extract ZIP
        </button>
      </div>

      {extractedFiles.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Extracted Files:</h3>
          <ul>
            {extractedFiles.map((file, index) => (
              <li key={index}>
                {file.name} -{' '}
                <a
                  href={URL.createObjectURL(file.content)}
                  download={file.name}
                  className="text-blue-500 underline"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ZipUnzip;
