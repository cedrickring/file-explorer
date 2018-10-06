import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryViewComponent } from './directory-view/directory-view.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DirectoryViewComponent,
    BreadcrumbsComponent
  ],
  declarations: [
    DirectoryViewComponent,
    BreadcrumbsComponent
  ]
})
export class DirectoryModule {
}
