import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { File } from '@shared/models';
import { DirectoryService } from '../directory.service';

@Component({
  selector: 'fe-directory-view',
  templateUrl: './directory-view.component.html',
  styleUrls: ['./directory-view.component.scss']
})
export class DirectoryViewComponent implements OnChanges, AfterViewInit {

  @Input()
  directoryContent: File[];

  @Input()
  directoryName: string;

  @Output()
  openDirectory: EventEmitter<File>;

  @Output()
  openFile: EventEmitter<File>;

  @Output()
  openRootDirectory: EventEmitter<void>;

  @ViewChild('directory')
  directoryRef: ElementRef;

  supportedFileTypes: string[];
  directoryHistory: Array<File | string>;
  headerPadding = '0';

  constructor(directoryService: DirectoryService) {
    this.openDirectory = new EventEmitter<File>();
    this.openRootDirectory = new EventEmitter<void>();
    this.openFile = new EventEmitter<File>();
    this.directoryHistory = [];
    directoryService.getSupportedFileTypes().subscribe(types => this.supportedFileTypes = types);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.directoryContent && this.directoryContent) {
      this.directoryContent.forEach(file => {
        if (!this.supportedFileTypes.includes(file.fileExtension)) {
          file.fileExtension = 'blank';
        }
      });
      this.directoryContent = [
        ...this.directoryContent.filter(file => file.isDirectory).sort((a, b) => a.name.localeCompare(b.name)),
        ...this.directoryContent.filter(file => !file.isDirectory).sort((a, b) => a.name.localeCompare(b.name))
      ];
      setTimeout(() => this.checkHeaderPadding());
    }
    if (changes.directoryName && this.directoryName) {
      this.directoryHistory = [this.directoryName];
    }
  }

  ngAfterViewInit() {
    this.checkHeaderPadding();
  }

  public navigateBackInHistory(file: File, index: number) {
    if (file) {
      this.directoryHistory = this.directoryHistory.slice(0, index + 1);
      this.openDirectory.emit(file);
    } else {
      this.openRootDirectory.emit();
      this.directoryHistory = [this.directoryName];
    }
  }

  public navigateToDirectory(file: File) {
    this.directoryHistory.push(file);
    this.openDirectory.emit(file);
  }

  @HostListener('window:resize')
  public checkHeaderPadding() {
    if (!this.directoryRef) {
      return;
    }
    const directory = this.directoryRef.nativeElement as HTMLElement;
    this.headerPadding = directory.scrollHeight > directory.clientHeight ? '10px' : '0px';
  }

}
