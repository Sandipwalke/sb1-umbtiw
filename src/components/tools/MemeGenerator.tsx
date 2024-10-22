import React, { useState, useRef } from 'react';

const MemeGenerator: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');
  const [memeImage, setMemeImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const generateMeme = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          ctx?.drawImage(img, 0, 0);

          ctx!.font = '40px Impact';
          ctx!.fillStyle = 'white';
          ctx!.strokeStyle = 'black';
          ctx!.lineWidth = 2;
          ctx!.textAlign = 'center';

          // Top text
          ctx!.textBaseline = 'top';
          ctx!.fillText(topText, img.width / 2, 20);
          ctx!.strokeText(topText, img.width / 2, 20);

          // Bottom text
          ctx!.textBaseline = 'bottom';
          ctx!.fillText(bottomText, img.width / 2, img.height - 20);
          ctx!.strokeText(bottomText, img.width / 2, img.height - 20);

          setMemeImage(canvasRef.current.toDataURL());
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meme Generator</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <input
        type="text"
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
        placeholder="Top text"
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="text"
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
        placeholder="Bottom text"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={generateMeme}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={!selectedFile}
      >
        Generate Meme
      </button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {memeImage && (
        <div className="mt-4">
          <img src={memeImage} alt="Generated Meme" className="max-w-full" />
          <a
            href={memeImage}
            download="meme.png"
            className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download Meme
          </a>
        </div>
      )}
    </div>
  );
};

export default MemeGenerator;
