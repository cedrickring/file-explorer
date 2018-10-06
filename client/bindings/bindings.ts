import { ipcMain, IpcEvent } from 'electron';

export abstract class Binding {

  protected constructor(protected readonly channel: string) {
  }

  static register<T extends Binding>(factory: new() => T): void {
    const instance = new factory();
    console.log('registered Binding: ', instance.channel);
    ipcMain.on(instance.channel, instance.onMessage.bind(instance));
  }

  abstract onMessage(event: IpcEvent, args: any[]);

}


