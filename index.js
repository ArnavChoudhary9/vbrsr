const { app, BrowserWindow, screen } = require('electron');

app.commandLine.appendSwitch('ozone-platform-hint', 'auto');
app.commandLine.appendSwitch('enable-features', 'WaylandWindowDecorations');

// Declare mainWindow in a broader scope
let mainWindow;

app.on('ready', () => {
  // Get the primary display's work area size
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Create the BrowserWindow instance
  mainWindow = new BrowserWindow({
    width: Math.min(800, width), // Adjust width based on screen size
    height: Math.min(600, height), // Adjust height based on screen size
    webPreferences: {
      webviewTag: true,
      nodeIntegration: false,
    },
  });

  // Load the HTML file into the window
  mainWindow.loadFile('index.html');

  // Open Developer Tools for debugging (optional)
  // mainWindow.webContents.openDevTools();

  // Handle window resize events inside the ready callback
  mainWindow.on('resize', () => {
    const bounds = mainWindow.getContentBounds();
    const { width, height } = bounds;

    // Send resize event to renderer process
    mainWindow.webContents.send('resize', { width, height });
  });
});

// Quit the app when all windows are closed (default behavior for non-macOS platforms)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
