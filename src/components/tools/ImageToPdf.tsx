import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const ImageToPdf: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleOrientationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrientation(event.target.value as 'portrait' | 'landscape');
  };

  const convertToPdf = async () => {
    if (!image) return;

    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      const pdf = new jsPDF({ orientation });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = img.width;
      const imgHeight = img.height;

      // Calculate the aspect ratio
      const aspectRatio = imgWidth / imgHeight;

      let pdfWidth = pageWidth;
      let pdfHeight = pageWidth / aspectRatio;

      if (pdfHeight > pageHeight) {
        pdfHeight = pageHeight;
        pdfWidth = pageHeight * aspectRatio;
      }

      pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('download.pdf');
    };

    img.onerror = () => {
      console.error('Failed to load image');
    };
  };

  return (
    <div>
      <h1>JPG/PNG to PDF Converter</h1>
      <p>This tool allows you to convert JPG or PNG images to PDF format.</p>
      <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
      <select value={orientation} onChange={handleOrientationChange}>
        <option value="portrait">Portrait</option>
        <option value="landscape">Landscape</option>
      </select>
      <button onClick={convertToPdf} disabled={!image}>Convert to PDF</button>
    </div>
  );
};

export default ImageToPdf;
