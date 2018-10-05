import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let sidebar : SidebarComponent;
  let app : firebase.app.App;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      providers: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sidebar = TestBed.get(SidebarComponent);
    app = component.firebase;
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

  it('should be contructed', () => {
    expect(component.firebase).toEqual(sidebar.app);
    expect(component.userId).toEqual(sidebar.user_id);
  });

  it('should change admin to user and back', () => {
    var oldPrivLevel = (document.getElementById("new-privilege-level") as HTMLInputElement).value;
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "User";
    var oldUserName = (document.getElementById("change-priv-username") as HTMLInputElement).value;
    (document.getElementById("change-priv-username") as HTMLInputElement).value = "testUser";
    component.editPrivileges();
    expect((document.getElementById("error-message").innerHTML)).toEqual("");
    firebase.database().ref('user_id/fl0cFQm4xoP6EU5O90pMiEXX2x53/priv').once('value')
    .then(function(snapshot){
      expect(snapshot.val()).toEqual(3);
    });
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "Admin";
    component.editPrivileges();
    expect((document.getElementById("error-message").innerHTML)).toEqual("");
    firebase.database().ref('user_id/fl0cFQm4xoP6EU5O90pMiEXX2x53/priv').once('value')
    .then(function(snapshot){
      expect(snapshot.val()).toEqual(3);
    });
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = oldPrivLevel;
    (document.getElementById("change-priv-username") as HTMLInputElement).value = oldUserName;
  });

  it('should change gm to user and back', () => {
    var oldPrivLevel = (document.getElementById("new-privilege-level") as HTMLInputElement).value;
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "User";
    var oldUserName = (document.getElementById("change-priv-username") as HTMLInputElement).value;
    (document.getElementById("change-priv-username") as HTMLInputElement).value = "testUser";
    component.editPrivileges();
    expect((document.getElementById("error-message").innerHTML)).toEqual("");
    firebase.database().ref('user_id/fl0cFQm4xoP6EU5O90pMiEXX2x53/priv').once('value')
    .then(function(snapshot){
      expect(snapshot.val()).toEqual(3);
    });
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "GM";
    component.editPrivileges();
    expect((document.getElementById("error-message").innerHTML)).toEqual("");
    firebase.database().ref('user_id/fl0cFQm4xoP6EU5O90pMiEXX2x53/priv').once('value')
    .then(function(snapshot){
      expect(snapshot.val()).toEqual(3);
    });
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = oldPrivLevel;
    (document.getElementById("change-priv-username") as HTMLInputElement).value = oldUserName;
  });

  it('should change gm to admin and back', () => {
    var oldPrivLevel = (document.getElementById("new-privilege-level") as HTMLInputElement).value;
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "Admin";
    var oldUserName = (document.getElementById("change-priv-username") as HTMLInputElement).value;
    (document.getElementById("change-priv-username") as HTMLInputElement).value = "testUser";
    component.editPrivileges();
    expect((document.getElementById("error-message").innerHTML)).toEqual("");
    firebase.database().ref('user_id/fl0cFQm4xoP6EU5O90pMiEXX2x53/priv').once('value')
    .then(function(snapshot){
      expect(snapshot.val()).toEqual(3);
    });
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "GM";
    component.editPrivileges();
    expect((document.getElementById("error-message").innerHTML)).toEqual("");
    firebase.database().ref('user_id/fl0cFQm4xoP6EU5O90pMiEXX2x53/priv').once('value')
    .then(function(snapshot){
      expect(snapshot.val()).toEqual(3);
    });
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = oldPrivLevel;
    (document.getElementById("change-priv-username") as HTMLInputElement).value = oldUserName;
  });

  it('should not change for invalid name', () => {
    var oldPrivLevel = (document.getElementById("new-privilege-level") as HTMLInputElement).value;
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "Admin";
    var oldUserName = (document.getElementById("change-priv-username") as HTMLInputElement).value;
    (document.getElementById("change-priv-username") as HTMLInputElement).value = "test_User";
    component.editPrivileges();
    expect((document.getElementById("error-message").innerHTML)).toEqual("");
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "GM";
    component.editPrivileges();
    expect((document.getElementById("error-message").innerHTML)).toEqual("");
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "User";
    component.editPrivileges();
    expect((document.getElementById("error-message").innerHTML)).toEqual("");
    (document.getElementById("change-priv-username") as HTMLInputElement).value = "TestUser";
    component.editPrivileges();
    expect((document.getElementById("error-message").innerHTML)).toEqual("");
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = oldPrivLevel;
    (document.getElementById("change-priv-username") as HTMLInputElement).value = oldUserName;
  });
});
