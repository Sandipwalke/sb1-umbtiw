import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PdfMerger: React.FC = () => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFiles(Array.from(e.target.files));
    }
  };

  const mergePdfs = async () => {
    const mergedPdf = await PDFDocument.create();

    for (const file of pdfFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const mergedPdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);
    setMergedPdfUrl(mergedPdfUrl);
  };

  return (
    <div>
      <h1>PDF Merger</h1>
      <p>This tool allows you to combine multiple PDF files into a single PDF document.</p>
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={mergePdfs}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={pdfFiles.length === 0}
      >
        Merge PDFs
      </button>
      {mergedPdfUrl && (
        <div>
          <a href={mergedPdfUrl} download="merged.pdf">Download Merged PDF</a>
        </div>
      )}
    </div>
  );
};

export default PdfMerger;
