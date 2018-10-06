import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileMenuService } from './file-menu.service';

@Component({
  selector: 'fe-file-menu',
  templateUrl: './file-menu.component.html',
  styleUrls: ['./file-menu.component.scss']
})
export class FileMenuComponent implements OnInit {

  libraries = ['Home', 'Desktop', 'Documents', 'Downloads'];
  drives: string[];

  @Output()
  showLibraryContents: EventEmitter<string>;

  @Output()
  showDriveContents: EventEmitter<string>;

  constructor(private fileMenuService: FileMenuService) {
    this.showLibraryContents = new EventEmitter<string>();
    this.showDriveContents = new EventEmitter<string>();
  }

  ngOnInit() {
    this.fileMenuService.getDrives().subscribe(drives => this.drives = drives);
  }

  getLibraryContent(library: string) {
    this.showLibraryContents.emit(library);
  }

  getDriveContent(drive: string) {
    this.showDriveContents.emit(drive);
  }

}
