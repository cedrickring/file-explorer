import { Injectable } from '@angular/core';
import { ElectronService } from './shared/electron/electron.service';
import { Observable } from 'rxjs';
import { File } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private electronService: ElectronService) {
  }

  getDirectoryContents(directory: File): Observable<File[]> {
    return this.electronService.send<File>('get_dir_contents', directory);
  }

  getLibraryContents(library: string): Observable<File[]> {
    return this.electronService.send<File>('get_library_contents', library);
  }

  getDriveContents(drive: string): Observable<File[]> {
    return this.electronService.send<File>('get_drive_contents', drive);
  }

  openFile(file: File) {
    this.electronService.execute('open_file', file);
  }

}
