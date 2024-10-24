import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExcelToPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [columnWidth, setColumnWidth] = useState<'auto' | 'wrap'>('auto');
  const [paperSize, setPaperSize] = useState<'a4' | 'a3' | 'custom'>('a4');
  const [customWidth, setCustomWidth] = useState<number>(595); // Default A4 width in points
  const [customHeight, setCustomHeight] = useState<number>(842); // Default A4 height in points

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select an Excel file to convert.');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = read(arrayBuffer, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = utils.sheet_to_json(worksheet, { header: 1 });

      const format = paperSize === 'custom' ? [customWidth, customHeight] : paperSize;

      const pdf = new jsPDF({ orientation, unit: 'pt', format });

      autoTable(pdf, {
        head: [data[0]],
        body: data.slice(1),
        startY: 20,
        styles: {
          overflow: 'linebreak',
          cellWidth: columnWidth,
          fontSize: 8,
        },
        tableWidth: 'auto',
      });

      pdf.save(`${file.name.replace(/\.[^/.]+$/, '')}.pdf`);
    } catch (err) {
      setError('An error occurred during conversion. Please try again.');
      console.error('Error converting Excel to PDF:', err);
    }
  };

  return (
    <div>
      <h1>Excel to PDF Converter</h1>
      <p>This tool allows you to convert Excel spreadsheets to PDF format.</p>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
      <div>
        <label>
          Orientation:
          <select value={orientation} onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Column Width:
          <select value={columnWidth} onChange={(e) => setColumnWidth(e.target.value as 'auto' | 'wrap')}>
            <option value="auto">Auto</option>
            <option value="wrap">Wrap</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Paper Size:
          <select value={paperSize} onChange={(e) => setPaperSize(e.target.value as 'a4' | 'a3' | 'custom')}>
            <option value="a4">A4</option>
            <option value="a3">A3</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        {paperSize === 'custom' && (
          <div>
            <label>
              Custom Width (pt):
              <input type="number" value={customWidth} onChange={(e) => setCustomWidth(Number(e.target.value))} />
            </label>
            <label>
              Custom Height (pt):
              <input type="number" value={customHeight} onChange={(e) => setCustomHeight(Number(e.target.value))} />
            </label>
          </div>
        )}
      </div>
      <button
        onClick={handleConvert}
        disabled={!file}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Convert to PDF
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ExcelToPdf;
