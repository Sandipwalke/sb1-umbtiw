import React, { useState, useRef } from 'react';

const ConvertToGrayscale: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [grayscaleImage, setGrayscaleImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      convertToGrayscale(e.target.files[0]);
    }
  };

  const convertToGrayscale = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          ctx?.drawImage(img, 0, 0);

          const imageData = ctx!.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
          }

          ctx!.putImageData(imageData, 0, 0);
          setGrayscaleImage(canvasRef.current.toDataURL());
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Convert Image to Grayscale</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {grayscaleImage && (
        <div className="mt-4">
          <img src={grayscaleImage} alt="Grayscale" className="max-w-full" />
          <a
            href={grayscaleImage}
            download="grayscale-image.png"
            className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default ConvertToGrayscale;
