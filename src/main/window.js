import { BrowserWindow, app } from 'electron';
import { join } from 'path'
import { setupIPC } from './ipc';
import { is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'

export function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 800,
    maximizable: false,
    autoHideMenuBar: true,
    resizable: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'rgba(0,0,0,0)',
      height: 35,
      symbolColor: 'white'
    },
    movable: true,
    // alwaysOnTop: true,
    show: false,
    icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  setupIPC(mainWindow);
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && import.meta.env['MAIN_VITE_ELECTRON_RENDERER_URL']) {
  // if (false) {
    // mainWindow.loadURL(import.meta.env['MAIN_VITE_ELECTRON_RENDERER_URL'])
    mainWindow.loadURL("http://localhost:8080/lol-wom-helper/")
  } else {
    const defaultUrl = "https://kaihei.online/lol-wom-helper";
    const checkUrlAvailability = async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
      } catch (error) {
        return false;
      }
    };

    const loadUrlOrDefault = async () => {
      const isAvailable = await checkUrlAvailability(defaultUrl);
      if (isAvailable) {
        mainWindow.loadURL(defaultUrl);
      } else {
        mainWindow.loadFile(join(__dirname, '../renderer/default.html'));
      }
    };
    loadUrlOrDefault();
    // mainWindow.loadURL("https://kaihei.online/lol-wom-helper")
    // mainWindow.loadURL("http://localhost:8080")
    // mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('closed', () => {
    app.quit()
  })
}
