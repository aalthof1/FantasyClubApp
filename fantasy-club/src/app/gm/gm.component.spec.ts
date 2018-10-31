import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmComponent } from './gm.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

describe('GmComponent', () => {
  let component: GmComponent;
  let fixture: ComponentFixture<GmComponent>;
  let sidebar: SidebarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmComponent ],
      providers: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmComponent);
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
    expect(component.app).toEqual(sidebar.app);
    expect(component.userId).toEqual(sidebar.user_id);
  });

  it('should get dice rolls', () => {
    let oldName: string = (document.getElementById("dice-username") as HTMLInputElement).value;
    (document.getElementById("dice-username") as HTMLInputElement).value = "";
    component.getDiceRolls();
    
  });

});
