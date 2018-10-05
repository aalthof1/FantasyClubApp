import { Component, OnInit, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() firebase: firebase.app.App;
  @Input() userId;
  newPrivLevel: string;

  constructor(private sidebar: SidebarComponent) {
    this.firebase = sidebar.app
    this.userId = sidebar.user_id
   }

  ngOnInit() {
   }



  editPrivileges() {
    var editPrivUsername = (document.getElementById("change-priv-username") as HTMLInputElement).value;
    var newPrivLevel = (document.getElementById("new-privilege-level") as HTMLInputElement).value;
    var privLevInt = 1;
    switch(newPrivLevel) {
      case "User":
        break;
      case "GM":
        privLevInt = 2;
        break;
      case "Admin":
        privLevInt = 3;
        break;
    }
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
    firebase.database().ref('user_id').once('value')
      .then(function(snapshot) {
        var found = false;
        snapshot.forEach(function(snapshotChild) {
          if(snapshotChild.child("name").val() == editPrivUsername) {
            var res = confirm("Change " + editPrivUsername + " to " + newPrivLevel + "?");
            if(res) {
              snapshotChild.child("priv").ref.set(privLevInt);
              found = true;
            }
            return;
          }
        });
        if(!found) {
          document.getElementById("error-message").innerHTML = "Username Not Found";
        }
      });
  }

}
