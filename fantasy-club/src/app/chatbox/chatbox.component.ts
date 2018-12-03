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
  sessionList : Array<firebase.database.DataSnapshot> = [];
  selectedSession : firebase.database.DataSnapshot = null;
  messageList : Array<firebase.database.DataSnapshot> = [];
  messageUser : Array<string> = [];
  messageText : Array<string> = [];
  noMessages: boolean = true;
  highestKey : number = -1;

  clearData() {
    this.sessionList = [];
    this.selectedSession = null;
    this.messageList = [];
    this.messageUser = [];
    this.noMessages = true;
    this.highestKey = -1;
    this.messageText = [];
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
      this.clearData();
      return;
    }
    if (this.loggedIn()) {
      this.toggle = true;
      this.clearData();
      this.displaySessions()
    }
  }
  unselect() {
    this.clearData()
    this.displaySessions();
  }
  displaySessions() {
    firebase.database().ref("games").once("value").then(function (snapshot) {
      snapshot.forEach(function(childsnap) {
        this.sessionList.push(childsnap)
      }.bind(this))
    }.bind(this))
  }
  updateSnapshot() {
    this.selectedSession.ref.once("value").then(function (snapshot) {
      this.selectedSession = snapshot;
      this.getMessages();
    }.bind(this))
  }


  getMessages() {
    if(this.selectedSession == undefined) {
      return;
    }
    if (this.selectedSession.hasChild("messages")) {
      this.noMessages = false;
      this.selectedSession.child("messages").ref.orderByKey().on("value", function(snapshot) {
        this.messageList = [];
        this.messageUsers = [];
        this.messageText = [];
        snapshot.forEach(function(childsnap) {
          this.messageList.unshift(childsnap);
          this.messageUser.unshift(childsnap.child("user").val())
          this.messageText.unshift(childsnap.child("msg").val())
          if (parseInt(childsnap.key) > this.highestKey) {
            this.highestKey = parseInt(childsnap.key);
          } 
          while (this.messageList.length > 10) {
            this.messageList.pop();
            this.messageUser.pop();
            this.messageText.pop();
          }
        }.bind(this))
      }.bind(this))
    }
    else {
      this.noMessages = true;
    }
  }
  addMessage() {
    let input = (document.getElementById("messageEnter") as HTMLInputElement).value;
    if (input == "" || input == undefined) {
      console.log("no input found")
      return;
    }
    let number = this.highestKey + 1;
    this.highestKey++;
    this.selectedSession.ref.child("messages/" + number.toString()).set({
      user : firebase.auth().currentUser.displayName, 
      msg : input
    }).then(() => {
      this.getMessages(); 
      this.noMessages = false;
      (document.getElementById("messageEnter") as HTMLInputElement).value = "";
    } ); 
  }
}
