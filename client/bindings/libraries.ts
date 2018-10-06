import { Binding } from './bindings';
import { homedir } from 'os';
import { join } from 'path';
import { getDirContents } from '../utils';

export class LibraryBinding extends Binding {

  constructor() {
    super('get_library_contents');
  }

  onMessage(event: Electron.IpcEvent, args: any[]) {
    const library = args[0];
    const libraryPath = library === 'Home' ? homedir() : join(homedir(), library);

    getDirContents(libraryPath)
      .then(contents => event.sender.send(this.channel, contents))
      .catch(reason => event.sender.send(this.channel, reason));
  }

}
