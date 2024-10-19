import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const CompressPdf: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [compressedPdf, setCompressedPdf] = useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const compressPdf = async () => {
    if (!pdfFile) return;

    const pdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Compress images in the PDF
    const pages = pdfDoc.getPages();
    for (const page of pages) {
      const { width, height } = page.getSize();
      page.scale(0.5, 0.5);
      page.setSize(width / 2, height / 2);
    }

    const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });
    const compressedBlob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
    setCompressedPdf(compressedBlob);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Compress PDF</h1>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf"
        className="mb-4"
      />
      <button
        onClick={compressPdf}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={!pdfFile}
      >
        Compress PDF
      </button>
      {compressedPdf && (
        <div>
          <p>PDF compressed successfully!</p>
          <a
            href={URL.createObjectURL(compressedPdf)}
            download="compressed.pdf"
            className="text-blue-500 underline"
          >
            Download Compressed PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default CompressPdf;
