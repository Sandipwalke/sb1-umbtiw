import React from 'react';
import { useParams } from 'react-router-dom';
import WordCounter from './tools/WordCounter';
import CharacterCounter from './tools/CharacterCounter';
import CaseConverter from './tools/CaseConverter';
import RemoveDuplicates from './tools/RemoveDuplicates';
import TextEncryption from './tools/TextEncryption';
import TextToSpeech from './tools/TextToSpeech';
import SpeechToText from './tools/SpeechToText';
import HtmlToMarkdown from './tools/HtmlToMarkdown';
import JsonToCsv from './tools/JsonToCsv';
import LoremIpsumGenerator from './tools/LoremIpsumGenerator';
import TextSummarizer from './tools/TextSummarizer';
import GrammarChecker from './tools/GrammarChecker';
import ParaphrasingTool from './tools/ParaphrasingTool';
import PlagiarismChecker from './tools/PlagiarismChecker';

const TextTools: React.FC = () => {
  const { '*': toolName } = useParams<{ '*': string }>();

  const renderTool = () => {
    switch (toolName) {
      case 'word-counter':
        return <WordCounter />;
      case 'character-counter':
        return <CharacterCounter />;
      case 'case-converter':
        return <CaseConverter />;
      case 'remove-duplicate-lines-words':
      case 'remove-duplicate-lines/words':
        return <RemoveDuplicates />;
      case 'text-encryption':
        return <TextEncryption />;
      case 'text-to-speech':
        return <TextToSpeech />;
      case 'speech-to-text':
        return <SpeechToText />;
      case 'html-to-markdown':
        return <HtmlToMarkdown />;
      case 'json-to-csv':
        return <JsonToCsv />;
      case 'lorem-ipsum-generator':
        return <LoremIpsumGenerator />;
      case 'text-summarizer':
        return <TextSummarizer />;
      case 'grammar-checker':
        return <GrammarChecker />;
      case 'paraphrasing-tool':
        return <ParaphrasingTool />;
      case 'plagiarism-checker':
        return <PlagiarismChecker />;
      default:
        return <div>Select a tool from the sidebar</div>;
    }
  };

  return (
    <div className="p-4">
      {renderTool()}
    </div>
  );
};

export default TextTools;