import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  toggle : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  loggedIn() {
    if (firebase.auth().currentUser != null) {
      return true;
    }
    return false;
  }

  toggleChatbox() {
    if (this.toggle == true) {
      this.toggle = false;
      return;
    }
    if (this.loggedIn()) {
      this.toggle = true;
      
    }
    //else nothing
  }

}
