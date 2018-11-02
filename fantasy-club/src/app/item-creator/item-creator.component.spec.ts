import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreatorComponent } from './item-creator.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

describe('ItemCreatorComponent', () => {
  let component: ItemCreatorComponent;
  let fixture: ComponentFixture<ItemCreatorComponent>;
  let sidebar: SidebarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCreatorComponent ],
      providers: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    sidebar = TestBed.get(SidebarComponent);
    expect(component.userId).toEqual(sidebar.user_id);
  });

  it('should initialize fields', () => {
    expect(component.name).toBeUndefined();
    expect(component.desc).toBeUndefined();
    expect(component.public).toBeUndefined();
    expect(component.items).toEqual([]);
    expect(component.snapshot).toBeUndefined();
    expect(component.diceAmount).toBeUndefined();
    expect(component.diceType).toBeUndefined();
    expect(component.stat).toBeUndefined();
    expect(component.bonus).toBeUndefined();
  });

  it('should say user is GM', () => {
    sidebar = TestBed.get(SidebarComponent);
    sidebar.user_priv = 2;
    expect(component.isUserGM()).toBeTruthy();
    sidebar.user_priv = 3;
    expect(component.isUserGM()).toBeTruthy();
    sidebar.user_priv = 1;
    expect(component.isUserGM()).toBeFalsy();
  });
});
