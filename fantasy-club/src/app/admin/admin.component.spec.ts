import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

describe('Valid Changes', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let sidebar : SidebarComponent;
  let firebase : firebase.app.App;

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
    firebase = component.firebase;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be contructed', () => {
    expect(component.firebase).toEqual(sidebar.app);
    expect(component.userId).toEqual(sidebar.user_id);
  });

  it('should change admin privs', () => {
    var oldPrivLevel = (document.getElementById("new-privilege-level") as HTMLInputElement).value;
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "User";
    var oldUserName = (document.getElementById("change-priv-username") as HTMLInputElement).value;
    (document.getElementById("change-priv-username") as HTMLInputElement).value = "Aaron Althoff";
    component.editPrivileges();
    firebase.database().ref('user_id/fl0cFQm4xoP6EU5O90pMiEXX2x53/priv').once('value')
      .then(function(snapshot){
        expect(snapshot.val()).toEqual(1);
      });
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = "3";
    component.editPrivileges();
    (document.getElementById("new-privilege-level") as HTMLInputElement).value = oldPrivLevel;
    (document.getElementById("change-priv-username") as HTMLInputElement).value = oldUserName;
  });
});
