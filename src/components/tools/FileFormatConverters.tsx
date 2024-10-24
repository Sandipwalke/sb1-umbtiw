import React, { useState } from 'react';
import mammoth from 'mammoth';
import PptxGenJS from 'pptxgenjs';

const FileFormatConverters: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('txt');
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name.split('.').slice(0, -1).join('.')); // Store the file name without extension

    const fileType = file.name.split('.').pop();

    if (fileType === 'docx') {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setFileContent(result.value);
    } else if (fileType === 'ppt') {
      const pptx = new PptxGenJS();
      // Add logic to read and convert ppt file
      // Example: pptx.load(file);
      setFileContent('PPT conversion logic not implemented');
    } else if (fileType === 'txt') {
      const text = await file.text();
      setFileContent(text);
    } else {
      setFileContent('Unsupported file format');
    }
  };

  const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormat(event.target.value);
  };

  const handleConvertAndDownload = () => {
    let convertedContent = fileContent;

    // Add conversion logic based on selectedFormat
    if (selectedFormat === 'pdf') {
      // Example: Convert to PDF logic
      convertedContent = 'PDF conversion logic not implemented';
    } else if (selectedFormat === 'html') {
      // Example: Convert to HTML logic
      convertedContent = `<html><body>${fileContent}</body></html>`;
    }

    const blob = new Blob([convertedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${selectedFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>File Format Converters</h1>
      <p>This tool allows you to convert various file formats including .docx, .ppt, and .txt.</p>
      <input type="file" onChange={handleFileChange} />
      <div>
        <label htmlFor="formatSelect">Select format to convert to:</label>
        <select id="formatSelect" value={selectedFormat} onChange={handleFormatChange}>
          <option value="txt">Text</option>
          <option value="pdf">PDF</option>
          <option value="html">HTML</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <h2>Converted Content:</h2>
        <pre>{fileContent}</pre>
      </div>
      <button onClick={handleConvertAndDownload}>Convert and Download</button>
    </div>
  );
};

export default FileFormatConverters;
