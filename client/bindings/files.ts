import { Binding } from './bindings';
import { File } from '@shared/models';
import { getDirContents } from '../utils';
import { shell } from 'electron';

export class DirectoryBinding extends Binding {

  constructor() {
    super('get_dir_contents');
  }

  onMessage(event: Electron.IpcEvent, args: any[]) {
    const file = args[0] as File;

    getDirContents(file.fullPath)
      .then(files => event.sender.send('get_dir_contents', files))
      .catch(e => console.error(e));
  }

}

export class FileBinding extends Binding {

  constructor() {
    super('open_file');
  }

  onMessage(event: Electron.IpcEvent, args: any[]) {
    const file = args[0] as File;
    shell.openItem(file.fullPath);
  }

}
