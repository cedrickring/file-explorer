import { Binding } from './bindings';
import { browserWindow } from '../index';

export class WindowControlsBinding extends Binding {

  constructor() {
    super('change_window');
    browserWindow.on('maximize', () => {
      browserWindow.webContents.send('window_state_changed', 'maximized');
    });
    browserWindow.on('unmaximize', () => {
      browserWindow.webContents.send('window_state_changed', 'restored');
    });
  }

  onMessage(event: Electron.IpcEvent, args: any[]) {
    switch (args[0]) {
      case 'close':
        browserWindow.close();
        break;
      case 'maximize':
        browserWindow.maximize();
        break;
      case 'minimize':
        browserWindow.minimize();
        break;
      case 'restore':
        browserWindow.restore();
        break;
    }
  }

}
