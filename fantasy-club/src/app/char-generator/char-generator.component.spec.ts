import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharGeneratorComponent } from './char-generator.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

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
    sidebar = TestBed.get(SidebarComponent);
    if(!firebase.apps.length) {
      var config = {
        apiKey: "AIzaSyA7rfAhOVMuPaTkzGQXSwNnNx5iZDG8-EQ",
        authDomain: "purdue-fantasy-club.firebaseapp.com",
        databaseURL: "https://purdue-fantasy-club.firebaseio.com",
        projectId: "purdue-fantasy-club",
        storageBucket: "purdue-fantasy-club.appspot.com",
        messagingSenderId: "625002728234"
      }
      firebase.initializeApp(config);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should construct', () => {
    expect(component.userId).toEqual(sidebar.user_id);
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
