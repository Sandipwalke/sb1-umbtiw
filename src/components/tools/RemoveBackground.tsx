import React, { useState } from 'react';

const RemoveBackground: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeBackground = async () => {
    if (!selectedFile) return;

    // Here you would typically send the image to a background removal API
    // For demonstration, we'll just display the original image
    const reader = new FileReader();
    reader.onload = (event) => {
      setProcessedImage(event.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);

    // Actual API call would look something like this:
    // const formData = new FormData();
    // formData.append('image', selectedFile);
    // const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    //   method: 'POST',
    //   headers: {
    //     'X-Api-Key': 'YOUR_API_KEY'
    //   },
    //   body: formData
    // });
    // const blob = await response.blob();
    // setProcessedImage(URL.createObjectURL(blob));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Remove Background</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={removeBackground}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={!selectedFile}
      >
        Remove Background
      </button>
      {processedImage && (
        <div className="mt-4">
          <img src={processedImage} alt="Processed" className="max-w-full" />
          <a
            href={processedImage}
            download="no-background.png"
            className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default RemoveBackground;
