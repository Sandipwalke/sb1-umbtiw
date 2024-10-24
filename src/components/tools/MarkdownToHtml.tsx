import React, { useState } from 'react';
import { marked } from 'marked';

const MarkdownToHtml: React.FC = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const convertToHtml = () => {
    const convertedHtml = marked(markdown);
    setHtml(convertedHtml);
  };

  return (
    <div>
      <h1>Markdown to HTML Converter</h1>
      <p>This tool allows you to convert Markdown files to HTML format.</p>
      <textarea
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Enter Markdown here..."
        className="w-full h-40 p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={convertToHtml}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Convert to HTML
      </button>
      <div
        className="w-full p-2 border border-gray-300 rounded"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default MarkdownToHtml;
