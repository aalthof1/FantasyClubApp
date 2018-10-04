import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharSheetComponent } from './char-sheet.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('CharSheetComponent', () => {
  let component: CharSheetComponent;
  let fixture: ComponentFixture<CharSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharSheetComponent ],
      providers: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
