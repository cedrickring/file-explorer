import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileMenuModule } from './file-menu/file-menu.module';
import { HttpClientModule } from '@angular/common/http';
import { WindowTopBarComponent } from './window-top-bar/window-top-bar.component';
import { DirectoryModule } from './directory/directory.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FileMenuModule,
    DirectoryModule
  ],
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    WindowTopBarComponent
  ]
})
export class AppModule {
}
