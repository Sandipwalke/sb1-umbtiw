import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ToolContent from './components/ToolContent';
import { toolCategories } from './data/toolData';

function App() {
  const [selectedTool, setSelectedTool] = useState<{id: number, name: string} | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          toolCategories={toolCategories}
          setSelectedTool={setSelectedTool}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <ToolContent
          selectedTool={selectedTool}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </div>
    </div>
  );
}

export default App;