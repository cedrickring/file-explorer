import { Injectable } from '@angular/core';
import { ElectronService } from '../shared/electron/electron.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowTopBarService {

  constructor(private electronService: ElectronService) {
  }

  public maximize() {
    this.electronService.execute('change_window', 'maximize');
  }

  public restore() {
    this.electronService.execute('change_window', 'restore');
  }

  public minimize() {
    this.electronService.execute('change_window', 'minimize');
  }

  public close() {
    this.electronService.execute('change_window', 'close');
  }

  public observeWindowState(): Observable<string[]> {
    return this.electronService.on<string>('window_state_changed');
  }

}
