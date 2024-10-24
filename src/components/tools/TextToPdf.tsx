import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const TextToPdf: React.FC = () => {
  const [text, setText] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const convertTextToPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    page.drawText(text, {
      x: 50,
      y: height - 50,
      size: 12,
      maxWidth: width - 100,
      lineHeight: 14,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  return (
    <div>
      <h1>Text to PDF Converter</h1>
      <p>This tool allows you to convert plain text files to PDF format.</p>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here..."
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={convertTextToPdf}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Convert to PDF
      </button>
      {pdfUrl && (
        <div>
          <a href={pdfUrl} download="converted.pdf">Download PDF</a>
        </div>
      )}
    </div>
  );
};

export default TextToPdf;
