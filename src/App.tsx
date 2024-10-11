import React, { useState } from 'react';
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
import { toolCategories } from './data/toolData';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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