import { Component } from '@angular/core';
import { AppService } from './app.service';
import { File } from '@shared/models';
import { RootDirectoryType } from './shared/models/root-directory-type.enum';

@Component({
  selector: 'fe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  directoryContent: File[];
  directoryName: string;
  rootDirectoryType: RootDirectoryType;

  constructor(private appService: AppService) {
  }

  showLibraryContent(library: string) {
    this.directoryName = library;
    this.rootDirectoryType = RootDirectoryType.LIBRARY;
    this.appService.getLibraryContents(library).subscribe(files => this.directoryContent = files);
  }

  showDriveContent(drive: string) {
    this.directoryName = drive;
    this.rootDirectoryType = RootDirectoryType.DRIVE;
    this.appService.getDriveContents(drive).subscribe(files => this.directoryContent = files);
  }

  openDirectory(directory: File) {
    this.appService.getDirectoryContents(directory).subscribe(files => this.directoryContent = files);
  }

  openFile(file: File) {
    this.appService.openFile(file);
  }

  openRootDirectory() {
    switch (this.rootDirectoryType) {
      case RootDirectoryType.LIBRARY:
        this.showLibraryContent(this.directoryName);
        break;
      case RootDirectoryType.DRIVE:
        this.showDriveContent(this.directoryName);
        break;
    }
  }

}
