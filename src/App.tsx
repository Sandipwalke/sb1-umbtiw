import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ToolContent from './components/ToolContent';
import DocumentConverters from './components/DocumentConverters';
import ImagePhotoEditors from './components/ImagePhotoEditors';
import UnitConverters from './components/UnitConverters';
import CurrencyConverter from './components/CurrencyConverter';
import TextTools from './components/TextTools';
import FileCompression from './components/FileCompression';
import DateTimeTools from './components/DateTimeTools';
import MathTools from './components/MathTools';
import QrBarcodeTool from './components/QrBarcodeTool';
import VideoPlayer from './components/VideoPlayer';
import AudioPlayer from './components/AudioPlayer';
import WebTorrent from './components/WebTorrent';
import Tool3D from './components/Tool3D';
import ArTools from './components/ArTools';
import MiscTools from './components/MiscTools';
import PdfToWord from './components/tools/PdfToWord';
import WordToPdf from './components/tools/WordToPdf';
import PdfToExcel from './components/tools/PdfToExcel';
import ExcelToPdf from './components/tools/ExcelToPdf';
import PdfToImage from './components/tools/PdfToImage';
import ImageToPdf from './components/tools/ImageToPdf';
import FileFormatConverters from './components/tools/FileFormatConverters';
import EpubToPdf from './components/tools/EpubToPdf';
import OdtToPdf from './components/tools/OdtToPdf';
import MarkdownToHtml from './components/tools/MarkdownToHtml';
import MarkdownToPdf from './components/tools/MarkdownToPdf';
import TextToPdf from './components/tools/TextToPdf';
import PdfMerger from './components/tools/PdfMerger';
import PdfSplitter from './components/tools/PdfSplitter';
import TextFileConverter from './components/tools/TextFileConverter';
import { toolCategories } from './data/toolData';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar
            toolCategories={toolCategories}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
          <Routes>
            <Route path="/" element={<ToolContent isSidebarCollapsed={isSidebarCollapsed} />} />
            <Route path="/document-converters" element={<DocumentConverters />} />
            <Route path="/document-converters/pdf-to-word" element={<PdfToWord />} />
            <Route path="/document-converters/word-to-pdf" element={<WordToPdf />} />
            <Route path="/document-converters/pdf-to-excel" element={<PdfToExcel />} />
            <Route path="/document-converters/excel-to-pdf" element={<ExcelToPdf />} />
            <Route path="/document-converters/pdf-to-jpg-png" element={<PdfToImage />} />
            <Route path="/document-converters/jpg-png-to-pdf" element={<ImageToPdf />} />
            <Route path="/document-converters/file-format-converters" element={<FileFormatConverters />} />
            <Route path="/document-converters/epub-to-pdf" element={<EpubToPdf />} />
            <Route path="/document-converters/odt-to-pdf" element={<OdtToPdf />} />
            <Route path="/document-converters/markdown-to-html" element={<MarkdownToHtml />} />
            <Route path="/document-converters/markdown-to-pdf" element={<MarkdownToPdf />} />
            <Route path="/document-converters/text-to-pdf" element={<TextToPdf />} />
            <Route path="/document-converters/pdf-merger" element={<PdfMerger />} />
            <Route path="/document-converters/pdf-splitter" element={<PdfSplitter />} />
            <Route path="/document-converters/text-file-converter" element={<TextFileConverter />} />
            <Route path="/image-photo-editors" element={<ImagePhotoEditors />} />
            <Route path="/unit-converters" element={<UnitConverters />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/text-tools" element={<TextTools />} />
            <Route path="/file-compression" element={<FileCompression />} />
            <Route path="/date-time-tools" element={<DateTimeTools />} />
            <Route path="/math-tools" element={<MathTools />} />
            <Route path="/qr-barcode-tools" element={<QrBarcodeTool />} />
            <Route path="/video-players" element={<VideoPlayer />} />
            <Route path="/audio-players" element={<AudioPlayer />} />
            <Route path="/web-torrent" element={<WebTorrent />} />
            <Route path="/3d-tools" element={<Tool3D />} />
            <Route path="/ar-tools" element={<ArTools />} />
            <Route path="/misc-tools" element={<MiscTools />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;