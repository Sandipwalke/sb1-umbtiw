import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X, Home } from 'lucide-react';

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
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toolCategories, isCollapsed, setIsCollapsed }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

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

  const getCategoryPath = (categoryName: string) => {
    return '/' + categoryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  };

  const getToolPath = (categoryName: string, toolName: string) => {
    return `${getCategoryPath(categoryName)}/${toolName.toLowerCase().replace(/ /g, '-')}`;
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
          <Link to="/" className="flex items-center mb-4 text-blue-600 hover:text-blue-800">
            <Home size={20} className="mr-2" />
            Home
          </Link>
          {toolCategories.map((category) => (
            <div key={category.name} className="mb-2">
              <button
                className="flex items-center justify-between w-full text-left font-medium"
                onClick={() => toggleCategory(category.name)}
              >
                <Link to={getCategoryPath(category.name)} className="flex-grow">
                  {category.name}
                </Link>
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
                      <Link
                        to={getToolPath(category.name, tool.name)}
                        className="text-sm hover:text-blue-600"
                      >
                        {tool.name}
                      </Link>
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