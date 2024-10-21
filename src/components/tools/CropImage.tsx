import React, { useState, useCallback, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface AspectRatio {
  name: string;
  value: number | undefined;
}

const aspectRatios: AspectRatio[] = [
  { name: 'Free', value: undefined },
  { name: '1:1', value: 1 },
  { name: '4:3', value: 4 / 3 },
  { name: '16:9', value: 16 / 9 },
  { name: '2:3', value: 2 / 3 },
];

const CropImage: React.FC = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;
  }, []);

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspect(newAspect);
    if (newAspect) {
      const width = Math.min(100, crop.width);
      const height = width / newAspect;
      setCrop({ ...crop, width, height });
    }
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(parseFloat(e.target.value));
  };

  const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotation(parseInt(e.target.value));
  };

  const getCroppedImg = useCallback(() => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) return;

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    ctx.restore();

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Canvas is empty');
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'cropped-image.jpg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/jpeg');
  }, [completedCrop, rotation, zoom]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crop Image</h1>
      <input type="file" accept="image/*" onChange={onSelectFile} className="mb-4" />

      {src && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio:</label>
            <div className="flex space-x-2">
              {aspectRatios.map((ratio) => (
                <button
                  key={ratio.name}
                  onClick={() => handleAspectChange(ratio.value)}
                  className={`px-3 py-1 rounded ${
                    aspect === ratio.value ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {ratio.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zoom: {zoom.toFixed(2)}x
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={handleZoomChange}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rotation: {rotation}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={handleRotationChange}
              className="w-full"
            />
          </div>

          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={src}
              style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
              onLoad={(e) => onImageLoad(e.currentTarget)}
            />
          </ReactCrop>

          <button
            onClick={getCroppedImg}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={!completedCrop?.width || !completedCrop?.height}
          >
            Download Cropped Image
          </button>
        </div>
      )}

      <canvas ref={previewCanvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CropImage;
