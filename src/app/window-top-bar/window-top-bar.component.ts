import { Component, OnInit } from '@angular/core';
import { WindowTopBarService } from './window-top-bar.service';

@Component({
  selector: 'fe-window-top-bar',
templateUrl: './window-top-bar.component.html',
  styleUrls: ['./window-top-bar.component.scss']
})
export class WindowTopBarComponent implements OnInit {

  isFullscreen = false;

  public constructor(private windowTopBarService: WindowTopBarService) {
  }

  public ngOnInit() {
    this.windowTopBarService.observeWindowState().subscribe(state => {
      switch (state[0]) {
        case 'maximized':
          this.isFullscreen = true;
          break;
        case 'restored':
          this.isFullscreen = false;
          break;
      }
    });
  }

  public toggleFullscreen() {
    if (this.isFullscreen) {
      this.windowTopBarService.restore();
    } else {
      this.windowTopBarService.maximize();
    }
    this.isFullscreen = !this.isFullscreen;
  }

  public minimize() {
    this.windowTopBarService.minimize();
  }

  public close() {
    this.windowTopBarService.close();
  }

}
