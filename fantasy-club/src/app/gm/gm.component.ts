import { Component, OnInit, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-gm',
  templateUrl: './gm.component.html',
  styleUrls: ['./gm.component.css']
})
export class GmComponent implements OnInit {

  @Input() app: firebase.app.App;
  @Input() userId;

  constructor(private sidebar: SidebarComponent) {
    this.app = sidebar.app
    this.userId = sidebar.user_id
   }

  ngOnInit() {
  }

  displayDiceRolls(diceUsername: string) {
    if(diceUsername == "") {
      //Do something
    } else {
      var temp = "<p>";
      firebase.database().ref("dice_rolls/" + diceUsername).once("value")
        .then(function(snapshot){
          if(!snapshot.hasChildren()) {
            return; //TODO: no children handling
          } else {
            temp += diceUsername + " rolled on a " + snapshot.child("type").val() + " sided die:</p><ul>";
            snapshot.forEach(function(snapshotChild) {
              if(snapshotChild.key == "type") {}
              else if(snapshotChild.key == "total" || snapshotChild.key == "mod") {
                temp += "<li>" + snapshotChild.key + ": " + snapshotChild.val() + "</li>";
              }
              else {
                temp += "<li>die #" + snapshotChild.key + ": " + snapshotChild.val() + "</li>";
              }
            });
            temp += "</ul>";
            document.getElementById("roll-container").innerHTML += temp;
          }
        });
    }
  }

  
  getDiceRolls() {
    var diceUsername = (document.getElementById("dice-username") as HTMLInputElement).value;
    if(diceUsername == "") {
      document.getElementById("roll-container").innerHTML = "";
      firebase.database().ref("dice_rolls/").once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(snapshotChild){
            this.displayDiceRolls(snapshotChild.key);
          }.bind(this));
        }.bind(this));
    } else {
      document.getElementById("roll-container").innerHTML = "";
      this.displayDiceRolls(diceUsername);
    }
  }

}
