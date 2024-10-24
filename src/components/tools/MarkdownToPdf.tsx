import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { marked } from 'marked';

const MarkdownToPdf: React.FC = () => {
  const [markdown, setMarkdown] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const convertMarkdownToPdf = async () => {
    const htmlContent = marked(markdown);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Simplified: You need to format the HTML content properly
    page.drawText(htmlContent, {
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
      <h1>Markdown to PDF Converter</h1>
      <p>This tool allows you to convert Markdown files to PDF format.</p>
      <textarea
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Enter Markdown here..."
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={convertMarkdownToPdf}
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

export default MarkdownToPdf;
