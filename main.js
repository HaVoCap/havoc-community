const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

// WAŻNE: Ustaw ścieżkę userData PRZED createWindow
// To zapewnia że localStorage będzie trwały
app.setPath('userData', path.join(app.getPath('appData'), 'HavocCommunity'));

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 700,
        title: 'Havoc Community',
        backgroundColor: '#0a0a0a',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            // Trwałe przechowywanie danych
            webviewTag: true
        },
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'assets/icon.png')
    });

    // Ładujemy index.html
    mainWindow.loadFile('index.html');

    // DevTools - odkomentuj do debugowania
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});