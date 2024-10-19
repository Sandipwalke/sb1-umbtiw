import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToWord: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPdfFile(event.target.files[0]);
      setError(null);
      setSuccess(null);
      setProgress(0);
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let textContent = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const text = await page.getTextContent();
      text.items.forEach((item: any) => {
        textContent += item.str + ' ';
      });
      setProgress((pageNum / pdf.numPages) * 50);
    }

    return textContent;
  };

  const createWordDoc = async (text: string): Promise<Blob> => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(text)],
          }),
        ],
      }],
    });

    return await Packer.toBlob(doc);
  };

  const convertPdfToWord = async () => {
    if (!pdfFile) {
      setError('Please select a PDF file first.');
      return;
    }

    setIsConverting(true);
    setError(null);
    setSuccess(null);
    setProgress(0);

    try {
      console.log('Starting PDF to Word conversion process...');
      
      const text = await extractTextFromPDF(pdfFile);
      console.log('PDF content extracted successfully.');
      setProgress(60);

      const blob = await createWordDoc(text);
      console.log('Word document created.');
      setProgress(80);

      saveAs(blob, `${pdfFile.name.replace('.pdf', '')}.docx`);
      console.log('Word document saved successfully.');
      setProgress(100);
      setSuccess('Conversion completed successfully. The Word document has been downloaded.');

    } catch (err) {
      console.error('Error converting PDF to Word:', err);
      setError('An error occurred during conversion. Please try again with a different PDF file.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">PDF to Word Converter</h1>
      <p className="mb-4">This tool allows you to convert PDF files to Word documents. Please note that complex formatting and images may not be preserved.</p>
      
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded"
      />
      
      <button
        onClick={convertPdfToWord}
        disabled={!pdfFile || isConverting}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {isConverting ? 'Converting...' : 'Convert to Word'}
      </button>
      
      {isConverting && (
        <div className="mt-4">
          <p>Converting: {progress}%</p>
          <div className="w-full bg-gray-200 rounded">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}
      
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default PdfToWord;