import React, { useState } from 'react';

const ConvertImageFormat: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('png');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const convertImage = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL(`image/${targetFormat}`);
        setConvertedImage(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Convert Image Format</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <select
        value={targetFormat}
        onChange={(e) => setTargetFormat(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WebP</option>
      </select>
      <button
        onClick={convertImage}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={!selectedFile}
      >
        Convert
      </button>
      {convertedImage && (
        <div className="mt-4">
          <img src={convertedImage} alt="Converted" className="max-w-full" />
          <a
            href={convertedImage}
            download={`converted.${targetFormat}`}
            className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default ConvertImageFormat;
