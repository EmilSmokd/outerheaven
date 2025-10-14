const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Optional: for exposing Node.js APIs to renderer
      nodeIntegration: true, // Be cautious with this in production
      contextIsolation: false, // Be cautious with this in production
    },
  });

  // Load your built React app
  // mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  mainWindow.loadURL('http://localhost:5173')
  // Or, for development, load from your React dev server:
  // mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
