import { exec } from 'child_process';
import { Binding } from './bindings';
import { IpcEvent } from 'electron';
import { getDirContents } from '../utils';

export class GetDrivesBinding extends Binding {

  constructor() {
    super('get_drives');
  }

  onMessage(event: IpcEvent, args: any[]): void {
    exec('wmic logicaldisk get name', (error, stdout) => {
      if (error) {
        event.sender.send(this.channel, error);
      } else {
        event.sender.send(this.channel, stdout.split('\r\r\n')
          .filter(value => /[A-Za-z]:/.test(value))
          .map(value => value.trim()));
      }
    });
  }

}

export class GetDriveContentBinding extends Binding {

  constructor() {
    super('get_drive_contents');
  }

  onMessage(event: Electron.IpcEvent, args: any[]) {
    const path = `${args[0]}\\`;

    getDirContents(path)
      .then(contents => event.sender.send(this.channel, contents))
      .catch(reason => event.sender.send(this.channel, reason));
  }

}
