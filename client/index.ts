import { app, BrowserWindow } from 'electron';
import {
  Binding,
  DirectoryBinding, FileBinding,
  GetDriveContentBinding,
  GetDrivesBinding,
  LibraryBinding,
  SettingsBinding,
  WindowControlsBinding
} from './bindings';
import { BrowserSettings, RendererSettings } from './settings/settings';
import * as isDev from 'electron-is-dev';
import { format } from 'url';
import { join } from 'path';

export let browserWindow: BrowserWindow;

function createWindow() {
  browserWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: '#fff',
    frame: false,
    show: false
  });

  if (isDev) {
    browserWindow.loadURL('http://localhost:4200');
  } else {
    browserWindow.loadURL(format({
      pathname: join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  browserWindow.webContents.openDevTools({ mode: 'detach' });
  registerBindings();

  browserWindow.on('closed', () => {
    browserWindow = null;
  });

  browserWindow.on('ready-to-show', () => {
    browserWindow.show();
  });
}

function registerBindings() {
  Binding.register(GetDrivesBinding);
  Binding.register(GetDriveContentBinding);
  Binding.register(LibraryBinding);
  Binding.register(WindowControlsBinding);
  Binding.register(DirectoryBinding);
  Binding.register(FileBinding);
  Binding.register(SettingsBinding);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  RendererSettings.saveSettings();
  BrowserSettings.saveSettings();
  app.quit();
});

app.on('activate', () => {
  if (browserWindow === null) {
    createWindow();
  }
});
