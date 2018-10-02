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
  editPrivUsername : string;
  newPrivLevel: string;
  snapshot: firebase.database.DataSnapshot;

  constructor(private sidebar: SidebarComponent) {
    this.app = sidebar.app
    this.userId = sidebar.user_id
   }

  ngOnInit() { }



  editPrivileges() {
    this.editPrivUsername = (document.getElementById("change-priv-username") as HTMLInputElement).value;
    this.newPrivLevel = (document.getElementById("new-privilege-level") as HTMLInputElement).value;
    confirm("Change " + this.editPrivUsername + " to " + this.newPrivLevel + "?");
  }

}
