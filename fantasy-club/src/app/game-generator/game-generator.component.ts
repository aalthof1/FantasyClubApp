import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';


@Component({
  selector: 'app-game-generator',
  templateUrl: './game-generator.component.html',
  styleUrls: ['./game-generator.component.css']
})
export class GameGeneratorComponent implements OnInit {

  @Input() userName;
  @Input() userId;
  @Input() app;
  @Input() currChar;
  @Input() currGame;
  @Input() currpriv;
  @Output() refresh = new EventEmitter<string>();
  name: string;
  desc: string;
  capacity: number;
  picture: string;
  games: Array<string> = [];
  snapshot: firebase.database.DataSnapshot;
  errorText: string = "";

  constructor(private sidebar: SidebarComponent) {
    this.app = sidebar.app
    this.userId = sidebar.user_id
    this.currChar = sidebar.currChar
    this.currGame = sidebar.currGame
  }


  ngOnInit() { }

  isUserGMGame() {
    if (this.sidebar.user_priv >= 2) {
      return true;
    }
    return false;
  }

  inputGame(snapshot: firebase.database.DataSnapshot) {
    snapshot.forEach(function (childSnapshot) {
      this.games.push(childSnapshot.key);
    }.bind(this))
    if (this.games.includes(this.name) || this.userName == "" || this.name == "") {
      return;
    }
    else {
      var ref = snapshot.ref;
      ref.set({
        user_name: this.sidebar.user_name,
        user_id: this.sidebar.user_id,
        desc: this.desc,
        capacityLimit: this.capacity,
        image: this.picture
      });
    }
    this.refresh.emit("refresh");
  }

  createGame() {
    this.name = ((document.getElementById("name2") as HTMLInputElement).value);
    this.desc = ((document.getElementById("desc") as HTMLInputElement).value);
    this.picture = ((document.getElementById("gamePic") as HTMLInputElement).value);
    this.capacity = parseInt((document.getElementById("capacityBox") as HTMLInputElement).value);
    firebase.database().ref('games/' + this.name + "/").once('value')
      .then(snapshot => this.inputGame(snapshot));

  }

  joinGame() {
    this.errorText = "";
    if (this.sidebar.currGame == "" || this.sidebar.currChar == "") {
      return;
    }

    this.app.database().ref("games/" + this.sidebar.currGame).once("value").then(function (snapshot : firebase.database.DataSnapshot) {
      if (!snapshot.exists()) {
        this.errorText = "game " + this.sidebar.currGame + " does not exist";
        return;
      }
      let cap = 0;
      if (snapshot.child("capacityLimit").exists()) {
        snapshot.child("capacityLimit").val();
      }
      if (cap != 0 && snapshot.child("characters").exists()) {
        if (snapshot.child("characters").numChildren() >= cap) {
          this.errorText = "this game is at capacity"
          return;
        }
      }

      if(snapshot.hasChild("bg")) {
        let body = document.getElementsByTagName("body")[0].classList;
        body.remove("moss");
        body.remove("leather");
        body.remove("wood");
        body.remove("scales");
        body.remove("space");
        body.remove("stone");
        body.remove("metal");
        //alert(snapshot.child("background").val());
        body.add(snapshot.child("bg").val());
      }
      this.app.database().ref('games/' + this.sidebar.currGame + "/characters").child(this.sidebar.currChar).set(this.sidebar.user_name);
    }.bind(this))
  }

  deleteGame() {
    this.name = (document.getElementById("name2") as HTMLInputElement).value;
    firebase.database().ref().child("games/" + this.name + "/user_id").once("value")
      .then(function (snapshot) {
        if (
          this.name != "" && (this.sidebar.isUserAdmin() || snapshot.val() == this.userId)
        ) {
          firebase.database().ref().child("games/" + this.name + "/").remove();
        }
      }.bind(this))
    this.refresh.emit("refresh")
  }


  archiveGame() {
    this.name = ((document.getElementById("name2") as HTMLInputElement).value);
    if (this.app.database().ref('games/' + this.name + "/user_id").once('value') == this.userId
      || this.sidebar.isUserAdmin() == true) {
      this.app.database().ref("games/" + this.name).once('value')
        .then(function (snapshot: firebase.database.DataSnapshot) {
          snapshot.forEach(function (snapshotChild: firebase.database.DataSnapshot) {
            if (snapshotChild.hasChildren()) {
              snapshotChild.forEach(function (snapshotGrandchild) {
                this.app.database().ref("archive/" + this.name + "/" + snapshotChild.key + "/" + snapshotGrandchild.key).set(snapshotGrandchild.val());
              }.bind(this));
            } else {
              this.app.database().ref("archive/" + this.name + "/" + snapshotChild.key).set(snapshotChild.val());
            }
          }.bind(this));
        }.bind(this));

      this.app.database().ref('games/' + this.name + "/").remove();
    }
  }
}
