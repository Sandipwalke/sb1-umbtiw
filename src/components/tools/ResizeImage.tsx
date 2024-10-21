import React, { useState, useRef, ChangeEvent } from 'react';

const ResizeImage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    if (!image || !width || !height) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      setResizedImage(canvas.toDataURL());
    };
    img.src = image;
  };

  return (
    <div>
      <h1>Resize Image</h1>
      <p>This tool allows you to resize images to your desired dimensions.</p>
      
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      {image && (
        <div>
          <img src={image} alt="Original" style={{ maxWidth: '300px' }} />
          <div>
            <label>
              Width:
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
              />
            </label>
            <button onClick={handleResize}>Resize</button>
          </div>
        </div>
      )}

      {resizedImage && (
        <div>
          <h2>Resized Image:</h2>
          <img src={resizedImage} alt="Resized" />
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ResizeImage;
