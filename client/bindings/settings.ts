import { Binding } from './bindings';
import { RendererSettings } from '../settings/settings';

export class SettingsBinding extends Binding {

  constructor() {
    super('settings');
  }

  onMessage(event: Electron.IpcEvent, args: any[]) {
    const operation = args[0] as string;
    const key = args[1] as string;

    switch (operation) {
      case 'set':
        RendererSettings.set(key, args[2]);
        break;
      case 'get':
        event.sender.send(this.channel, RendererSettings.get(key));
        break;
      default:
        event.sender.send(this.channel, RendererSettings.getAll());
    }
  }

}
