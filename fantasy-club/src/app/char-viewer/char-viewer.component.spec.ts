import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharViewerComponent } from './char-viewer.component';

describe('CharViewerComponent', () => {
  let component: CharViewerComponent;
  let fixture: ComponentFixture<CharViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
