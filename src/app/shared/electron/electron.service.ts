import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const electron = (<any>window).require('electron');
const {ipcRenderer} = electron;

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  constructor(private zone: NgZone) {
  }

  /**
   * send a message through a channel and wait for a response from the browser process
   * @param channel the messaging channel
   * @param args optional args sent to the browser process
   */
  send<T>(channel: string, ...args: any[]): Observable<T[]> {
    const subject = new Subject<T[]>();
    ipcRenderer.send(channel, args);

    const listenerFunction = (event, remoteArgs) => {
      // zone.js doesn't know ipc, so we need to put the message back into the zone
      console.log(event, remoteArgs);
      this.zone.run(() => {
        subject.next(Array.isArray(remoteArgs) ? remoteArgs : [remoteArgs]);
        subject.complete();
      });
      ipcRenderer.removeListener(channel, listenerFunction);
    };

    ipcRenderer.on(channel, listenerFunction);
    return subject.asObservable();
  }

  /**
   * send a message through the specified channel to the browser process
   * @param channel the messaging channel
   * @param args optional arguments
   */
  execute(channel: string, ...args: any[]) {
    ipcRenderer.send(channel, args);
  }

  /**
   * listen on channel forever
   * @param channel the channel to listen on
   */
  on<T>(channel: string): Observable<T[]> {
    const subject = new Subject<T[]>();

    ipcRenderer.on(channel, (event, remoteArgs) => {
      this.zone.run(() => {
        subject.next(Array.isArray(remoteArgs) ? remoteArgs : [remoteArgs]);
        subject.complete();
      });
    });

    return subject.asObservable();
  }

}
