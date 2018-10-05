import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharGeneratorComponent } from './char-generator.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('Create Character', () => {
  let component: CharGeneratorComponent;
  let fixture: ComponentFixture<CharGeneratorComponent>;
  let sidebar: SidebarComponent;

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

  it('should update name correctly', () => {
    var oldName = ((document.getElementById("name") as HTMLInputElement).value);
    ((document.getElementById("name") as HTMLInputElement).value) = "Test Name";   
    component.createChar();
    ((document.getElementById("name") as HTMLInputElement).value) = oldName;
  });

  it('should not update name', () => {
    var oldName = ((document.getElementById("name") as HTMLInputElement).value);
    ((document.getElementById("name") as HTMLInputElement).value) = "";   
    component.createChar();
    ((document.getElementById("name") as HTMLInputElement).value) = oldName;
  });

  it('should update name correctly', () => {
    var oldName = ((document.getElementById("name") as HTMLInputElement).value);
    ((document.getElementById("name") as HTMLInputElement).value) = "Another_Test";   
    component.createChar();
    ((document.getElementById("name") as HTMLInputElement).value) = oldName;
  });

  it('should update name correctly', () => {
    var oldName = ((document.getElementById("name") as HTMLInputElement).value);
    ((document.getElementById("name") as HTMLInputElement).value) = "Still_More_Tests";   
    component.createChar();
    ((document.getElementById("name") as HTMLInputElement).value) = oldName;
  });

});
