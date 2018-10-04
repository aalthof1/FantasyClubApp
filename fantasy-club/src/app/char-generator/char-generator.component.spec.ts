import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharGeneratorComponent } from './char-generator.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('CharGeneratorComponent', () => {
  let component: CharGeneratorComponent;
  let fixture: ComponentFixture<CharGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharGeneratorComponent ],
      providers: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
