import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as firebase from 'firebase';
import { GameGeneratorComponent } from './game-generator.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { join } from 'path';

describe('GameGeneratorComponent', () => {
  let component: GameGeneratorComponent;
  let fixture: ComponentFixture<GameGeneratorComponent>;
  let sidebar: SidebarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameGeneratorComponent ],
      providers : [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameGeneratorComponent);
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
    expect(component.currChar).toEqual(sidebar.currChar);
    expect(component.currGame).toEqual(sidebar.currGame);
  });

  it('should set initial values', () =>{
    expect(component.games).toEqual([]);
    expect(component.errorText).toEqual("");
  });

  it('should leave these uninitialized', () => {
    expect(component.name).toBeUndefined();
    expect(component.desc).toBeUndefined();
    expect(component.capacity).toBeUndefined();
    expect(component.snapshot).toBeUndefined();
  });
  
  it('should say user is GM', () => {
    sidebar.user_priv = 2;
    expect(component.isUserGMGame()).toBeTruthy();
    sidebar.user_priv = 3;
    expect(component.isUserGMGame()).toBeTruthy();
    sidebar.user_priv = 1;
    expect(component.isUserGMGame()).toBeFalsy();
  });

  it('should not join game', () => {
    spyOn(component, "joinGame");
    sidebar.currGame = "";
    component.joinGame();
    expect(component.joinGame).toHaveBeenCalled();
  });

});
