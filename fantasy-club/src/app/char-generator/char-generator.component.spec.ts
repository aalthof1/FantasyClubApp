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

  it('should construct', () => {
    sidebar = TestBed.get(SidebarComponent);
    expect(component.app).toEqual(sidebar.app);
    expect(sidebar.user_name).toEqual(sidebar.user_name);
  });

  it('should update name correctly', () => {
    var oldName = ((document.getElementById("name") as HTMLInputElement).value);
    ((document.getElementById("name") as HTMLInputElement).value) = "Test Name";   
    component.createChar();
    ((document.getElementById("name") as HTMLInputElement).value) = oldName;
  });


});
