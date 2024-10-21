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

import SimpleCalculator from './components/tools/SimpleCalculator';
import PercentageCalculator from './components/tools/PercentageCalculator';
import FractionToDecimalConverter from './components/tools/FractionToDecimalConverter';
import ScientificCalculator from './components/tools/ScientificCalculator';
import AlgebraSolver from './components/tools/AlgebraSolver';
import MatrixCalculator from './components/tools/MatrixCalculator';
import QuadraticEquationSolver from './components/tools/QuadraticEquationSolver';
import UnitCircleCalculator from './components/tools/UnitCircleCalculator';
import ProbabilityCalculator from './components/tools/ProbabilityCalculator';

import QRCodeGenerator from './components/tools/QRCodeGenerator';
import BarcodeGenerator from './components/tools/BarcodeGenerator';
import QRCodeDecoder from './components/tools/QRCodeDecoder';
import BarcodeScanner from './components/tools/BarcodeScanner';

import UrlShortener from './components/tools/UrlShortener';
import PasswordGenerator from './components/tools/PasswordGenerator';
import JsonFormatter from './components/tools/JsonFormatter';
import Base64EncoderDecoder from './components/tools/Base64EncoderDecoder';
import EmailValidator from './components/tools/EmailValidator';
import IpAddressLookup from './components/tools/IpAddressLookup';
import HexToRgbConverter from './components/tools/HexToRgbConverter';
import RandomNumberGenerator from './components/tools/RandomNumberGenerator';
import ColorPicker from './components/tools/ColorPicker';
import DnsLookup from './components/tools/DnsLookup';
import DomainNameGenerator from './components/tools/DomainNameGenerator';
import WhoisLookup from './components/tools/WhoisLookup';
import BmiCalculator from './components/tools/BmiCalculator';
import MortgageCalculator from './components/tools/MortgageCalculator';
import LoanCalculator from './components/tools/LoanCalculator';
import TaxCalculator from './components/tools/TaxCalculator';

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
            <Route path="/math-tools/*" element={<MathTools />} />
            <Route path="/math-tools/simple-calculator" element={<SimpleCalculator />} />
            <Route path="/math-tools/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/math-tools/fraction-to-decimal-converter" element={<FractionToDecimalConverter />} />
            <Route path="/math-tools/scientific-calculator" element={<ScientificCalculator />} />
            <Route path="/math-tools/algebra-solver" element={<AlgebraSolver />} />
            <Route path="/math-tools/matrix-calculator" element={<MatrixCalculator />} />
            <Route path="/math-tools/quadratic-equation-solver" element={<QuadraticEquationSolver />} />
            <Route path="/math-tools/unit-circle-calculator" element={<UnitCircleCalculator />} />
            <Route path="/math-tools/probability-calculator" element={<ProbabilityCalculator />} />
            <Route path="/qr-barcode-tools/*" element={<QrBarcodeTool />}>
              <Route index element={<div>Please select a tool from the list above.</div>} />
              <Route path="qr-code-generator" element={<QRCodeGenerator />} />
              <Route path="barcode-generator" element={<BarcodeGenerator />} />
              <Route path="qr-code-decoder" element={<QRCodeDecoder />} />
              <Route path="barcode-scanner" element={<BarcodeScanner />} />
            </Route>
            <Route path="/video-players" element={<VideoPlayer />} />
            <Route path="/audio-players" element={<AudioPlayer />} />
            <Route path="/web-torrent" element={<WebTorrent />} />
            <Route path="/3d-tools" element={<Tool3D />} />
            <Route path="/ar-tools" element={<ArTools />} />
            <Route path="/misc-tools/*" element={<MiscTools />} />
            <Route path="/misc-tools/url-shortener" element={<UrlShortener />} />
            <Route path="/misc-tools/password-generator" element={<PasswordGenerator />} />
            <Route path="/misc-tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/misc-tools/base64-encoder-decoder" element={<Base64EncoderDecoder />} />
            <Route path="/misc-tools/email-validator" element={<EmailValidator />} />
            <Route path="/misc-tools/ip-address-lookup" element={<IpAddressLookup />} />
            <Route path="/misc-tools/hex-to-rgb-converter" element={<HexToRgbConverter />} />
            <Route path="/misc-tools/random-number-generator" element={<RandomNumberGenerator />} />
            <Route path="/misc-tools/color-picker" element={<ColorPicker />} />
            <Route path="/misc-tools/dns-lookup" element={<DnsLookup />} />
            <Route path="/misc-tools/domain-name-generator" element={<DomainNameGenerator />} />
            <Route path="/misc-tools/whois-lookup" element={<WhoisLookup />} />
            <Route path="/misc-tools/bmi-calculator" element={<BmiCalculator />} />
            <Route path="/misc-tools/mortgage-calculator" element={<MortgageCalculator />} />
            <Route path="/misc-tools/loan-calculator" element={<LoanCalculator />} />
            <Route path="/misc-tools/tax-calculator" element={<TaxCalculator />} />
            <Route path="/text-tools/text-encryption-aes-256" element={<TextEncryption />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
