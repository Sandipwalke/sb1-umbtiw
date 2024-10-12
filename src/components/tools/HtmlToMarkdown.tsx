import React, { useState } from 'react';
import TurndownService from 'turndown';

const HtmlToMarkdown: React.FC = () => {
  const [html, setHtml] = useState('');
  const [markdown, setMarkdown] = useState('');

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(e.target.value);
  };

  const convertToMarkdown = () => {
    if (!html) {
      alert('Please enter some HTML to convert');
      return;
    }

    const turndownService = new TurndownService();
    const convertedMarkdown = turndownService.turndown(html);
    setMarkdown(convertedMarkdown);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">HTML to Markdown</h1>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
        value={html}
        onChange={handleHtmlChange}
        placeholder="Enter HTML here..."
      />
      <button
        onClick={convertToMarkdown}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Convert to Markdown
      </button>
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded"
        value={markdown}
        readOnly
        placeholder="Converted Markdown will appear here..."
      />
    </div>
  );
};

export default HtmlToMarkdown;