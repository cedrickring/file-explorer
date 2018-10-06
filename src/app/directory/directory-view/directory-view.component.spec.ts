import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryViewComponent } from './directory-view.component';

describe('DirectoryViewComponent', () => {
  let component: DirectoryViewComponent;
  let fixture: ComponentFixture<DirectoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
