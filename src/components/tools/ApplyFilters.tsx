import React, { useState, useRef, useEffect } from 'react';

interface Filter {
  name: string;
  min: number;
  max: number;
  default: number;
  unit: string;
  property: string;
}

const filters: Filter[] = [
  { name: 'Brightness', min: 0, max: 200, default: 100, unit: '%', property: 'brightness' },
  { name: 'Contrast', min: 0, max: 200, default: 100, unit: '%', property: 'contrast' },
  { name: 'Saturation', min: 0, max: 200, default: 100, unit: '%', property: 'saturate' },
  { name: 'Hue Rotate', min: 0, max: 360, default: 0, unit: 'deg', property: 'hue-rotate' },
  { name: 'Blur', min: 0, max: 10, default: 0, unit: 'px', property: 'blur' },
  { name: 'Sepia', min: 0, max: 100, default: 0, unit: '%', property: 'sepia' },
  { name: 'Grayscale', min: 0, max: 100, default: 0, unit: '%', property: 'grayscale' },
  { name: 'Invert', min: 0, max: 100, default: 0, unit: '%', property: 'invert' },
];

const ApplyFilters: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filterValues, setFilterValues] = useState<{ [key: string]: number }>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initialFilterValues = filters.reduce((acc, filter) => {
      acc[filter.property] = filter.default;
      return acc;
    }, {} as { [key: string]: number });
    setFilterValues(initialFilterValues);
  }, []);

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
      img.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          ctx?.drawImage(img, 0, 0);
          applyFilters();
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const applyFilters = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const filterString = filters
      .map((filter) => `${filter.property}(${filterValues[filter.property]}${filter.unit})`)
      .join(' ');

    ctx.filter = filterString;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      setPreviewImage(canvasRef.current!.toDataURL());
    };
    img.src = canvasRef.current.toDataURL();
  };

  const handleFilterChange = (property: string, value: number) => {
    setFilterValues((prev) => ({ ...prev, [property]: value }));
  };

  const handleReset = () => {
    const resetValues = filters.reduce((acc, filter) => {
      acc[filter.property] = filter.default;
      return acc;
    }, {} as { [key: string]: number });
    setFilterValues(resetValues);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const link = document.createElement('a');
    link.download = 'filtered-image.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  useEffect(() => {
    if (selectedFile) {
      applyFilters();
    }
  }, [filterValues]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Apply Filters</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      
      <div className="flex flex-wrap -mx-2">
        {filters.map((filter) => (
          <div key={filter.property} className="w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {filter.name}: {filterValues[filter.property]}{filter.unit}
            </label>
            <input
              type="range"
              min={filter.min}
              max={filter.max}
              value={filterValues[filter.property]}
              onChange={(e) => handleFilterChange(filter.property, Number(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mb-4">
        <button
          onClick={handleReset}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Reset Filters
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={!selectedFile}
        >
          Download Filtered Image
        </button>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {previewImage && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Preview:</h2>
          <img src={previewImage} alt="Filtered" className="max-w-full border rounded" />
        </div>
      )}
    </div>
  );
};

export default ApplyFilters;
