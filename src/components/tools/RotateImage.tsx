import React, { useState, useRef } from 'react';

const RotateImage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [rotatedImage, setRotatedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      loadImage(e.target.files[0]);
    }
  };

  const loadImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => rotateImage(img);
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const rotateImage = (img: HTMLImageElement) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const angle = rotation * Math.PI / 180;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const width = Math.abs(img.width * cos) + Math.abs(img.height * sin);
    const height = Math.abs(img.width * sin) + Math.abs(img.height * cos);

    canvas.width = width;
    canvas.height = height;

    ctx.translate(width / 2, height / 2);
    ctx.rotate(angle);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    setRotatedImage(canvas.toDataURL());
  };

  const handleRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
    if (selectedFile) loadImage(selectedFile);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rotate Image</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <div className="mb-4">
        <button
          onClick={() => handleRotate(-90)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
        >
          Rotate Left
        </button>
        <button
          onClick={() => handleRotate(90)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Rotate Right
        </button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {rotatedImage && (
        <div className="mt-4">
          <img src={rotatedImage} alt="Rotated" className="max-w-full" />
          <a
            href={rotatedImage}
            download="rotated-image.png"
            className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default RotateImage;
