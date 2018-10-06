import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export interface BrowserSettings {
  lastDirectory: string;
}

const browserDefaults: BrowserSettings = {
  lastDirectory: process.env.HOME
};

class Settings<T = {}> {

  private readonly fullPath: string;
  private settings: T;

  constructor(name: string, private defaults: {} = {}) {
    this.fullPath = join(process.env.APPDATA, 'file-explorer', `${name}settings.json`);
    this.loadSettings();
  }

  private loadSettings() {
    if (existsSync(this.fullPath)) {
      this.settings = { ...JSON.parse(readFileSync(this.fullPath).toString()), ...browserDefaults } as T;
    } else {
      this.settings = { ...this.defaults } as T;
    }
  }

  public get<E = any>(key: string): E {
    return this.settings[key];
  }

  public getAll(): T {
    return this.settings;
  }

  public set(key: string, value: any): void {
    this.settings[key] = value;
  }

  public saveSettings() {
    writeFileSync(this.fullPath, JSON.stringify(this.settings));
  }

}

export const BrowserSettings = new Settings<BrowserSettings>('browser', browserDefaults);
export const RendererSettings = new Settings('renderer');


