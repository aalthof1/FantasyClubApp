import { Component, OnInit, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() app;
  @Input() userId;
  promoteUsername : string;
  revokeUsername: string;
  snapshot: firebase.database.DataSnapshot;

  constructor(private sidebar: SidebarComponent) {
    this.app = sidebar.app
    this.userId = sidebar.user_id
   }

  ngOnInit() { }

  createAdmin(snapshot: firebase.database.DataSnapshot) {
    alert("in create admin"); 
  }

  makeAdmin() {
    this.promoteUsername = (document.getElementById("promote-username") as HTMLInputElement).value;
    //this.app.database().ref('user_id/').once('value')
    //  .then(snapshot => this.createAdmin(snapshot));
    var res = confirm(this.promoteUsername);
  }

}
