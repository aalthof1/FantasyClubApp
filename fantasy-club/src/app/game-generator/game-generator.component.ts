import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-game-generator',
  templateUrl: './game-generator.component.html',
  styleUrls: ['./game-generator.component.css']
})
export class GameGeneratorComponent implements OnInit {

  @Input() userName;
  @Input() userId;
  @Input() app;
  @Output() refresh = new EventEmitter<string>();
  name: string;
  desc: string;
  games: Array<string> = [];
  snapshot: firebase.database.DataSnapshot;

  constructor(private sidebar: SidebarComponent) {
    this.userName = sidebar.user_name
    this.app = sidebar.app
    this.userId = sidebar.user_id
  }

  ngOnInit() { }

  grabHeroes(snapshot: firebase.database.DataSnapshot) {
    snapshot.forEach(function (childSnapshot) {
      this.games.push(childSnapshot.key);
    }.bind(this))
    if (this.games.includes(this.name) || this.userName == "" || this.name == "") {
      return;
    }
    else {
      var ref = snapshot.ref;
      ref.set({
        user_name: this.userName,
        user_id: this.userId,
        desc: this.desc
      });
    }
    this.refresh.emit("refresh");
    //this.sidebar.games = [];
    //this.sidebar.grabGames(this.app.database().ref('games/').once('value'));

  }

  createGame() {
    this.name = ((document.getElementById("name2") as HTMLInputElement).value);
    this.desc = ((document.getElementById("desc") as HTMLInputElement).value);
    this.app.database().ref('games/' + this.name + "/").once('value')
      .then(snapshot => this.grabHeroes(snapshot));

  }

  deleteGame() {
    this.name = ((document.getElementById("name2") as HTMLInputElement).value);
    if (this.app.database().ref('games/' + this.name + "/user_id").once('value') == this.userId || this.sidebar.isUserAdmin() == true && this.name != "") {
      this.app.database().ref('games/' + this.name + "/").remove();
    }
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
