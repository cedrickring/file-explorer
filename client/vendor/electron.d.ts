declare namespace Electron {

  interface IpcMain extends EventEmitter {

    /**
     * Listens to channel, when a new message arrives listener would be called with
     * listener(event, args...).
     */
    on(channel: string, listener: IpcFunction): this;

    /**
     * Adds a one time listener function for the event. This listener is invoked only
     * the next time a message is sent to channel, after which it is removed.
     */
    once(channel: string, listener: IpcFunction): this;

    /**
     * Removes listeners of the specified channel.
     */
    removeAllListeners(channel: string): this;

    /**
     * Removes the specified listener from the listener array for the specified
     * channel.
     */
    removeListener(channel: string, listener: IpcFunction): this;

  }

  type IpcFunction = (event: IpcEvent, args: any[]) => void;

  interface IpcEvent {

    returnValue: any;
    sender: WebContents;

  }

}
