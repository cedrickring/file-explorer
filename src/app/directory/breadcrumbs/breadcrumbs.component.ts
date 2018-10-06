import { Component, EventEmitter, Input, Output } from '@angular/core';
import { File } from '@shared/models';

@Component({
  selector: 'fe-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  @Input()
  crumbs: File[];

  @Output()
  switchDirectory: EventEmitter<{ file: File, index: number }>;

  constructor() {
    this.switchDirectory = new EventEmitter();
  }

  public goBackInHistory(fileOrFilename: File | string) {
    if (typeof fileOrFilename === 'string') {
      this.switchDirectory.emit({ file: null, index: 0 });
    } else {
      this.switchDirectory.emit({ file: fileOrFilename, index: this.crumbs.indexOf(fileOrFilename) });
    }
  }
}
