import { useState, useRef } from 'react';
import { FaSearch } from "react-icons/fa";

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

  const [url, setUrl] = useState('https://google.com'); // Default URL
  const webviewRef = useRef<HTMLWebViewElement>(null);
  const [inputUrl, setInputUrl] = useState('');

  const handleLoadUrl = () => {
    let formattedUrl = inputUrl.trim();

    if (formattedUrl) {
      // Prepend "https://" if the input looks like a domain but lacks a protocol
      if (!formattedUrl.startsWith('http') && /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formattedUrl)) {
        formattedUrl = `https://${formattedUrl}`;
      }

      // Check if the string is a valid URL
      if (!isValidUrl(formattedUrl)) {
        // If not a valid URL, format it as a Google search query
        formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(inputUrl.trim())}`;
      }

      setUrl(formattedUrl);

      // Reload webview with the new URL
      if (webviewRef.current) {
        webviewRef.current.setAttribute('src', formattedUrl); // Update src directly
      }
    }
  };

  // Helper function to validate URLs
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url); // If this succeeds, it's a valid URL
      return true;
    } catch (e) {
      return false; // If it throws an error, it's not a valid URL
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLoadUrl(); // Trigger the Go button functionality on Enter key press
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-900 p-1 h-8 flex justify-center items-center">
        <div className="flex items-center h-6 bg-gray-200 rounded-full border border-gray-400 shadow-sm">
          <input
            type="text"
            value={inputUrl}
            onKeyDown={handleKeyDown} // Listen for Enter key press
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search or enter URL"
            className="w-120 h-full bg-transparent px-2 text-xs text-gray-700 rounded-l-full focus:outline-none"
          />
          <button
            onClick={handleLoadUrl}
            className="bg-transparent text-gray-600 px-3 py-1 rounded-r-full hover:text-gray-800 active:text-gray-900 focus:outline-none"
          >
            <FaSearch size={14} /> {/* Add the search icon */}
          </button>
        </div>
      </div>

      {/* WebView */}
      <div className="flex-grow">
        <webview
          className="w-full h-full"
          ref={webviewRef}
          src={url}
        />
      </div>
    </div>
  );
}

export default App;
