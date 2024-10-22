import React, { useState, useRef } from 'react';
import { renderAsync } from 'docx-preview';
import { FileText, Upload } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const WordToPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select a Word document to convert.');
      return;
    }

    setConverting(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      if (previewRef.current) {
        // Clear previous content
        previewRef.current.innerHTML = '';
        
        await renderAsync(arrayBuffer, previewRef.current, previewRef.current, {
          className: 'docx-preview',
          inWrapper: false,
        });

        // Wait for images to load
        await new Promise(resolve => setTimeout(resolve, 1000));

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
          useCORS: true,
          logging: true,
          width: 800, // Set a specific width
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        pdf.save(`${file.name.replace(/\.[^/.]+$/, '')}.pdf`);
      }
    } catch (err) {
      setError('An error occurred during conversion. Please try again.');
      console.error('Error converting Word to PDF:', err);
    } finally {
      setConverting(false);
      // Clear the preview after conversion
      if (previewRef.current) {
        previewRef.current.innerHTML = '';
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Word to PDF Converter</h1>
      <p className="mb-6 text-gray-600">Convert your Word documents to PDF format easily and quickly.</p>
      
      <div className="mb-6">
        <label htmlFor="file-upload" className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <span className="flex items-center space-x-2">
            <Upload className="w-6 h-6 text-gray-600" />
            <span className="font-medium text-gray-600">
              {file ? file.name : 'Drop files to Attach, or browse'}
            </span>
          </span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <button
        onClick={handleConvert}
        disabled={!file || converting}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          !file || converting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        }`}
      >
        {converting ? 'Converting...' : 'Convert to PDF'}
      </button>

      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      {file && !error && (
        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
          <FileText className="w-4 h-4" />
          <span>{file.name}</span>
        </div>
      )}

      <div 
        ref={previewRef} 
        className="absolute left-[-9999px] top-[-9999px] w-[800px]"
      ></div>
    </div>
  );
};

export default WordToPdf;
