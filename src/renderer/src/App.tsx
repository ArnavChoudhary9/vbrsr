import { useState } from 'react';

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

  const [url, setUrl] = useState('https://google.com'); // Default URL
  const [inputUrl, setInputUrl] = useState('');

  const handleLoadUrl = () => {
    let formatedUrl = inputUrl.trim();

    if (formatedUrl) {
      if (!formatedUrl.startsWith('http')) {
        formatedUrl = `https://${formatedUrl}`;
      }

      setUrl(formatedUrl);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-blue-500 p-4 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
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
          key={url}
          src={url}
        />
      </div>
    </div>
  );
}

export default App
