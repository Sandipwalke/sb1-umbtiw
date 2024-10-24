import React, { useState } from 'react';
import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Set the workerSrc to the correct path
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`;

const PdfToImage: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const convertPdfToImages = async () => {
    if (!pdfFile) return;

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    const imageUrls: string[] = [];

    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      if (context) {
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        const imageUrl = canvas.toDataURL('image/png');
        imageUrls.push(imageUrl);
      }
    }

    setImages(imageUrls);
  };

  const downloadAllImages = async () => {
    const zip = new JSZip();
    images.forEach((image, index) => {
      const imgData = image.split(',')[1]; // Remove the data URL prefix
      zip.file(`page-${index + 1}.png`, imgData, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'pdf-images.zip');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PDF to JPG/PNG Converter</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={convertPdfToImages}
        disabled={!pdfFile}
        className={`px-4 py-2 rounded mb-4 ${pdfFile ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Convert PDF to Images
      </button>
      {images.length > 0 && (
        <button
          onClick={downloadAllImages}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
        >
          Download All Images
        </button>
      )}
      <div className="grid grid-cols-1 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border p-2">
            <img src={image} alt={`Page ${index + 1}`} className="max-w-full" />
            <a
              href={image}
              download={`page-${index + 1}.png`}
              className="text-blue-500 underline mt-2 inline-block"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfToImage;
