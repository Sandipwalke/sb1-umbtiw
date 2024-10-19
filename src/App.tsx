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
import RealTimeCurrencyConverter from './components/tools/RealTimeCurrencyConverter';
import HistoricalCurrencyRates from './components/tools/HistoricalCurrencyRates';
import CryptocurrencyConverter from './components/tools/CryptocurrencyConverter';
import WordCounter from './components/tools/WordCounter';
import CharacterCounter from './components/tools/CharacterCounter';
import CaseConverter from './components/tools/CaseConverter';
import RemoveDuplicates from './components/tools/RemoveDuplicates';
import TextEncryption from './components/tools/TextEncryption';
import TextToSpeech from './components/tools/TextToSpeech';
import SpeechToText from './components/tools/SpeechToText';
import HtmlToMarkdown from './components/tools/HtmlToMarkdown';
import JsonToCsv from './components/tools/JsonToCsv';
import LoremIpsumGenerator from './components/tools/LoremIpsumGenerator';
import TextSummarizer from './components/tools/TextSummarizer';
import GrammarChecker from './components/tools/GrammarChecker';
import ParaphrasingTool from './components/tools/ParaphrasingTool';
import PlagiarismChecker from './components/tools/PlagiarismChecker';
import { toolCategories } from './data/toolData';
import ZipUnzip from './components/tools/ZipUnzip';
import CompressPdf from './components/tools/CompressPdf';
import CompressImage from './components/tools/CompressImage';
import RarUnrar from './components/tools/RarUnrar';
import SevenZipArchiver from './components/tools/SevenZipArchiver';
import TarballExtractor from './components/tools/TarballExtractor';
import SplitLargeFiles from './components/tools/SplitLargeFiles';

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
            <Route path="/unit-converters/*" element={<UnitConverters />} />
            <Route path="/currency-converter" element={<CurrencyConverter />}>
              <Route path="real-time-currency-converter" element={<RealTimeCurrencyConverter />} />
              <Route path="historical-currency-rates" element={<HistoricalCurrencyRates />} />
              <Route path="cryptocurrency-converter" element={<CryptocurrencyConverter />} />
            </Route>
            <Route path="/text-tools/*" element={<TextTools />} />
            <Route path="/file-compression/decompression" element={<FileCompression />} />
            <Route path="/file-compression/decompression/zip/unzip-files" element={<ZipUnzip />} />
            <Route path="/file-compression/decompression/compress-pdf" element={<CompressPdf />} />
            <Route path="/file-compression/decompression/compress-image-files" element={<CompressImage />} />
            <Route path="/file-compression/decompression/rar/unrar-files" element={<RarUnrar />} />
            <Route path="/file-compression/decompression/7-zip-archiver" element={<SevenZipArchiver />} />
            <Route path="/file-compression/decompression/tarball-extractor" element={<TarballExtractor />} />
            <Route path="/file-compression/decompression/split-large-files" element={<SplitLargeFiles />} />
            <Route path="/date-time-tools/*" element={<DateTimeTools />} />
            <Route path="/math-tools" element={<MathTools />} />
            <Route path="/qr-barcode-tools" element={<QrBarcodeTool />} />
            <Route path="/video-players" element={<VideoPlayer />} />
            <Route path="/audio-players" element={<AudioPlayer />} />
            <Route path="/web-torrent" element={<WebTorrent />} />
            <Route path="/3d-tools" element={<Tool3D />} />
            <Route path="/ar-tools" element={<ArTools />} />
            <Route path="/misc-tools" element={<MiscTools />} />
            <Route path="/text-tools/text-encryption-aes-256" element={<TextEncryption />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
