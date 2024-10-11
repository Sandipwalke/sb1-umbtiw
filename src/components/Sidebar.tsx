import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

interface Tool {
  id: number;
  name: string;
}

interface Category {
  name: string;
  tools: Tool[];
}

interface SidebarProps {
  toolCategories: Category[];
  setSelectedTool: (tool: Tool | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toolCategories, setSelectedTool }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`bg-white overflow-y-auto transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && <h2 className="text-xl font-semibold">Tools</h2>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>
      {!isCollapsed && (
        <div className="p-4">
          {toolCategories.map((category) => (
            <div key={category.name} className="mb-2">
              <button
                className="flex items-center justify-between w-full text-left font-medium"
                onClick={() => toggleCategory(category.name)}
              >
                {category.name}
                {expandedCategories.includes(category.name) ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
              {expandedCategories.includes(category.name) && (
                <ul className="ml-4 mt-2">
                  {category.tools.map((tool) => (
                    <li key={tool.id} className="mb-1">
                      <button
                        className="text-sm hover:text-blue-600"
                        onClick={() => setSelectedTool(tool)}
                      >
                        {tool.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;