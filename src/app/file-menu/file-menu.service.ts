import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from '../shared/electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class FileMenuService {

  constructor(private electronService: ElectronService) {
  }

  getDrives(): Observable<string[]> {
    return this.electronService.send<string>('get_drives');
  }

}

