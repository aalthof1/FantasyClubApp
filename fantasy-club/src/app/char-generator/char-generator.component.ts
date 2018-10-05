import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-char-generator',
  templateUrl: './char-generator.component.html',
  styleUrls: ['./char-generator.component.css']
})
export class CharGeneratorComponent implements OnInit {

  @Input() userId;
  @Input() app;
  @Output() refresh = new EventEmitter<string>();
  name: string;
  characters: Array<string> = [];
  snapshot: firebase.database.DataSnapshot;

  config = {
    apiKey: "AIzaSyA7rfAhOVMuPaTkzGQXSwNnNx5iZDG8-EQ",
    authDomain: "purdue-fantasy-club.firebaseapp.com",
    databaseURL: "https://purdue-fantasy-club.firebaseio.com",
    projectId: "purdue-fantasy-club",
    storageBucket: "purdue-fantasy-club.appspot.com",
    messagingSenderId: "625002728234"
  }

  constructor(private sidebar: SidebarComponent) {
    this.userId = sidebar.user_id
    this.app = sidebar.app
    if(this.app == null) {
        this.app = firebase.initializeApp(this.config);
    }
  }
  
  ngOnInit() {
  }

  grabHeroes(snapshot: firebase.database.DataSnapshot) {
    snapshot.forEach(function (childSnapshot) {
      this.characters.push(childSnapshot.key);
    }.bind(this))
    if (this.characters.includes(this.name) || this.userId == "") {
      return;
    }
    else {
      var ref = snapshot.ref;
      ref = ref.child(this.name);
      ref.set({
        str: 0,
        int: 0,
        per: 0,
        cse: 0,
        hea: 0,
        agi: 0,
        pwr: 0,
        com: 0,
        wil: 0,
        dp: 0,
        eu: 0,
        du: 0,
        pu: 0,
        cmod: 0,
        mmod: 0,
        gmod: 0,
        lmod: 0,
        move: 0
      });
    }
    this.refresh.emit("refresh");
    this.sidebar.characters = [];
    this.sidebar.grabHeroes(snapshot);

  }

  createChar() {
    this.name = ((document.getElementById("name") as HTMLInputElement).value);
    this.app.database().ref('characters/' + this.userId + "/").once('value')
      .then(snapshot => this.grabHeroes(snapshot));

  }
}
