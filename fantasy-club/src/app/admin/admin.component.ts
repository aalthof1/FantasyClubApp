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
  editPrivUsername : string;
  newPrivLevel: string;

  constructor(private sidebar: SidebarComponent) {
    this.firebase = sidebar.app
    this.userId = sidebar.user_id
   }

  ngOnInit() { }



  editPrivileges() {
    this.editPrivUsername = (document.getElementById("change-priv-username") as HTMLInputElement).value;
    this.newPrivLevel = (document.getElementById("new-privilege-level") as HTMLInputElement).value;
    var privLevInt = 1;
    switch(this.newPrivLevel) {
      case "User":
        break;
      case "GM":
        privLevInt = 2;
        break;
      case "Admin":
        privLevInt = 3;
        break;
    }
    this.firebase.database().ref('user_id').once('value')
      .then(function(snapshot) {
        var found = false;
        snapshot.forEach(function(snapshotChild) {
          if(snapshotChild.child("name").val() == this.editPrivUsername) {
            var res = confirm("Change " + this.editPrivUsername + " to " + this.newPrivLevel + "?");
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
