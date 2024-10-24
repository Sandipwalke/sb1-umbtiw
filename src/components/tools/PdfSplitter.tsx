import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PdfSplitter: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [splitPdfUrls, setSplitPdfUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const splitPdf = async () => {
    if (!pdfFile) return;

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const numPages = pdfDoc.getPageCount();
    const splitUrls: string[] = [];

    for (let i = 0; i < numPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      splitUrls.push(pdfUrl);
    }

    setSplitPdfUrls(splitUrls);
  };

  return (
    <div>
      <h1>PDF Splitter</h1>
      <p>This tool allows you to separate PDF pages into individual PDF files.</p>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={splitPdf}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={!pdfFile}
      >
        Split PDF
      </button>
      <div>
        {splitPdfUrls.map((url, index) => (
          <div key={index}>
            <a href={url} download={`page-${index + 1}.pdf`}>Download Page {index + 1}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfSplitter;
