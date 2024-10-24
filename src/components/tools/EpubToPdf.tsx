import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import ePub from 'epubjs/lib/index';

const EpubToPdf: React.FC = () => {
  const [epubFile, setEpubFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setEpubFile(event.target.files[0]);
    }
  };

  const convertEpubToPdf = async () => {
    if (!epubFile) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const epubData = event.target?.result;
      const epub = ePub(epubData);

      // Wait for the EPUB to be fully loaded
      await epub.ready;

      const pdfDoc = await PDFDocument.create();

      // Iterate over the chapters in the EPUB
      for (let i = 0; i < epub.spine.length; i++) {
        try {
          const chapter = await epub.spine.get(i).load();
          const text = await chapter.render();

          // Log the extracted text for debugging
          console.log(`Chapter ${i} text:`, text);

          // Create a new page and draw the text
          const page = pdfDoc.addPage();
          const { width, height } = page.getSize();
          page.drawText(text, {
            x: 50,
            y: height - 50,
            size: 12,
            maxWidth: width - 100,
            lineHeight: 14,
          });
        } catch (error) {
          console.error(`Failed to load chapter ${i}:`, error);
          // Continue to the next chapter
          continue;
        }
      }

      // Save the PDF and trigger download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted.pdf';
      a.click();
    };

    reader.readAsArrayBuffer(epubFile);
  };

  return (
    <div>
      <h1>EPUB to PDF Converter</h1>
      <p>This tool allows you to convert EPUB files to PDF format.</p>
      <input type="file" accept=".epub" onChange={handleFileChange} />
      <button onClick={convertEpubToPdf}>Convert to PDF</button>
    </div>
  );
};

export default EpubToPdf;
