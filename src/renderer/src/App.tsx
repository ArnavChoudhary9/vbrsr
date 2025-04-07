import { useState, useRef } from 'react';

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

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-blue-500 p-1 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter URL"
          className="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleLoadUrl}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Go
        </button>
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
