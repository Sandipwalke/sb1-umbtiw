import React, { useState, useRef } from 'react';

const ImageWatermarking: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>('');
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const applyWatermark = () => {
    if (!selectedFile || !watermarkText) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          ctx?.drawImage(img, 0, 0);

          ctx!.font = '48px Arial';
          ctx!.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx!.textAlign = 'center';
          ctx!.textBaseline = 'middle';
          ctx!.fillText(watermarkText, img.width / 2, img.height / 2);

          setWatermarkedImage(canvasRef.current.toDataURL());
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Watermarking</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <input
        type="text"
        value={watermarkText}
        onChange={(e) => setWatermarkText(e.target.value)}
        placeholder="Enter watermark text"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={applyWatermark}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={!selectedFile || !watermarkText}
      >
        Apply Watermark
      </button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {watermarkedImage && (
        <div className="mt-4">
          <img src={watermarkedImage} alt="Watermarked" className="max-w-full" />
          <a
            href={watermarkedImage}
            download="watermarked-image.png"
            className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageWatermarking;
