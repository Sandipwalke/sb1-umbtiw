import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

const CompressImage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const compressImage = async () => {
    if (!imageFile) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      setCompressedImage(compressedFile);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Compress Image</h1>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="mb-4"
      />
      <button
        onClick={compressImage}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={!imageFile}
      >
        Compress Image
      </button>
      {compressedImage && (
        <div>
          <p>Image compressed successfully!</p>
          <a
            href={URL.createObjectURL(compressedImage)}
            download="compressed_image.jpg"
            className="text-blue-500 underline"
          >
            Download Compressed Image
          </a>
        </div>
      )}
    </div>
  );
};

export default CompressImage;
