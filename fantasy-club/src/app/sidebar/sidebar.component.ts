import { Component, OnInit, } from '@angular/core';
import * as firebase from 'firebase';
import { CurrentCharService } from "../current-char.service";
import { PassGameService } from "../pass-game.service";
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor
  (private currentChar: CurrentCharService, private passGameService : PassGameService, private settingsService: SettingsService) {}

  user_id: string = "";
  user_name: string = "";
  currChar: string = "";
  currGame: string = "";
  actualChar: string = "";
  user_priv: number;
  characters: Array<firebase.database.DataSnapshot> = [];
  games: Array<firebase.database.DataSnapshot> = [];
  events: Array<firebase.database.DataSnapshot> = [];
  status: Array<number> = [];
  createdItems: Array<firebase.database.DataSnapshot> = [];
  savedRolls: Array<string> = [];
  darkMode: false;
  currentPane = "";

  config = {
    apiKey: "AIzaSyA7rfAhOVMuPaTkzGQXSwNnNx5iZDG8-EQ",
    authDomain: "purdue-fantasy-club.firebaseapp.com",
    databaseURL: "https://purdue-fantasy-club.firebaseio.com",
    projectId: "purdue-fantasy-club",
    storageBucket: "purdue-fantasy-club.appspot.com",
    messagingSenderId: "625002728234"
  }
  app: firebase.app.App;



  ngOnInit() {
    if(!firebase.apps.length) {
     this.app = firebase.initializeApp(this.config);
    }
    this.signOut();
    if (this.isUserSignedIn()) {
      this.user_id = firebase.auth().currentUser.uid;
      this.user_name = firebase.auth().currentUser.displayName;
    }
    this.settingsService.currentDarkMode.subscribe(
      function(darkMode) {
        if(darkMode) {
          document.getElementsByTagName("body")[0].classList.add("darkMode");
          document.getElementById("navigation").classList.add("darkMode");
          document.getElementsByTagName("mat-toolbar")[0].classList.add("darkMode");
          document.getElementsByClassName("row")[0].classList.add("darkMode");
          if(document.getElementById("messageBox")) {
            document.getElementById("messageBox").classList.add("darkMode");
          }
        } else {
          document.getElementsByTagName("body")[0].classList.remove("darkMode");
          document.getElementById("navigation").classList.remove("darkMode");
          document.getElementsByTagName("mat-toolbar")[0].classList.remove("darkMode");
          document.getElementsByClassName("row")[0].classList.remove("darkMode");
          if(document.getElementById("messageBox")) {
            document.getElementById("messageBox").classList.remove("darkMode");
          }
        }
    });
  }

  toggleLogin() {
    if(this.currentPane == 'login') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "login";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }
  }

  toggleCharacters() {
    if(this.currentPane == 'characters') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "characters";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }
  }

  toggleSessions() {
    if(this.currentPane == 'sessions') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "sessions";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }    
  }

  toggleItems() {
    if(this.currentPane == 'items') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "items";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }    
  }

  toggleCreator() {
    if(this.currentPane == 'creator') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "creator";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }    
  }

  toggleAbilities() {
    if(this.currentPane == 'abilities') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "abilities";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }    
  }

  toggleTraps() {
    if(this.currentPane == 'traps') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "traps";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }    
  }

  toggleSettings() {
    if(this.currentPane == 'settings') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "settings";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }
  }

  toggleDR() {
    if(this.currentPane == 'diceroller') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "diceroller";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }
  }

  toggleRulebook() {
    if(this.currentPane == 'rules') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "rules";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }    
  }

  toggleCrit() {
    if(this.currentPane == 'crit') {
      this.currentPane = "";
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
    } else {
      this.currentPane = "crit";
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
    }    
  }

  getCurrentPane() {
    return this.currentPane;
  }

  isUserSignedIn() {
    if (firebase.auth().currentUser != null) {
      return true;
    }
    return false;
  }

  isUserGM() {
    if (this.user_priv >=2) {
      return true;
    }
    return false;
  }

  isUserAdmin() {
    if (this.user_priv >=3) {
      return true;
    }
    return false;
  }

  userSetup(snapshot: firebase.database.DataSnapshot) {
    if (snapshot.hasChild(this.user_id)) {
      console.log("user exists with priv level = " + snapshot.child(this.user_id).child('priv').val());
    }
    else {
      //we'll create the user in the database with base priviledge
      snapshot.ref.child(this.user_id).set({
        name: firebase.auth().currentUser.displayName,
        priv: 1,
      });
      firebase.database().ref('/characters/' + this.user_id + "/");
      console.log("user created with priv level = 1");
    }
    //grabs heroes belonging to user
    firebase.database().ref('characters/' + this.user_id + "/").on('value', snapshot => this.grabHeroes(snapshot))
  }

  onSuccessfulSignIn(result: firebase.auth.UserCredential) {
    this.user_name = result.user.displayName;
    this.user_id = result.user.uid;
    firebase.database().ref('/user_id/').once('value')
      .then(function (snapshot) {
        if (snapshot.hasChild(this.user_id)) {
          console.log("user exists with priv level = " + snapshot.child(this.user_id).child('priv').val());
          this.user_priv = snapshot.child(this.user_id).child('priv').val();
          //alert("user exists with priv level = " + snapshot.child(this.user_id).child('priv').val());
        }
        else {
          //we'll create the user in the database with base priviledge
          snapshot.ref.child(this.user_id).set({
            name: firebase.auth().currentUser.displayName,
            priv: 1
          });
          firebase.database().ref('/characters/' + this.user_id + "/");
          console.log("user created with priv level = 1");
        }

        //update background to user's preference
        if(snapshot.child(this.user_id).hasChild("background")) {
          let bg = snapshot.child(this.user_id).child("background").val();
          document.body.classList.add(bg);
        }

        //update font to user's preference
        if(snapshot.child(this.user_id).hasChild("font")) {
          let fontChoice = snapshot.child(this.user_id).child("font").val();
          document.body.classList.add(fontChoice);
        }

        //update color to user's preference
        if(snapshot.child(this.user_id).hasChild("color")) {
          let color = snapshot.child(this.user_id).child("color").val();
          document.getElementsByTagName("mat-toolbar")[0].classList.add(color);
          document.getElementsByTagName("mat-toolbar")[1].classList.add(color);
        }

        //grabs heroes belonging to user
        firebase.database().ref('characters/' + this.user_id + "/").once('value')
          .then(snapshot => this.grabHeroes(snapshot));
        //Grab games
        firebase.database().ref('games/').once('value')
          .then(snapshot => this.grabGames(snapshot));
        //Grab events
        firebase.database().ref('events/').on('value', snapshot => this.grabEvents(snapshot));
      }.bind(this));
      firebase.database().ref("savedRolls/").child(this.user_name).once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(child){
            this.savedRolls.push(child.key);
          }.bind(this));
        }.bind(this));
      
      firebase.database().ref("events/").once("value").then(function(snapshot) {
          snapshot.forEach(function(child : firebase.database.DataSnapshot){
            if(child.child('attending').child(this.user_id).val() == 1) {
              var currentDate: number = Date.now();
              if(child.child('date').val() < currentDate + 129600000) {
                var hours : number = ((child.child('date').val() - currentDate) / ((1000)*(60)*(60)) | 0);
                alert("You have an upcoming event. " + child.child("eventName").val() + " will begin in about " + hours + " hours.");
              }
            }
          }.bind(this));
      }.bind(this));

      firebase.database().ref("newestEvent/").once("value").then(function(snapshot : firebase.database.DataSnapshot) {
        if(snapshot.exists()) {
            alert("There has been a new event created recently. It is called " + snapshot.val() + ".");
            snapshot.ref.remove();
        }
      }.bind(this));
  }

  onUnsuccessfulSignIn(error) {
    console.log(error)
  }

  signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    this.signOut();
    if (this.isUserSignedIn()) {
      this.user_id = firebase.auth().currentUser.uid;
      this.user_name = firebase.auth().currentUser.displayName;
      firebase.database().ref("user_id").once("value")
        .then(function(snapshot){
          if(snapshot.child(this.user_id).child('priv').val() >= 2)  {
            document.getElementById("gm-container").classList.remove("no-display");
            document.getElementById("gm").classList.remove("no-display");
          }
          if(snapshot.child(this.user_id).child('priv').val() >= 3)  {
            document.getElementById("admin-container").classList.remove("no-display");
            document.getElementById("admin").classList.remove("no-display");
          }
        }.bind(this));
      return;
    }
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => this.onSuccessfulSignIn(result), error => { this.onUnsuccessfulSignIn });
  }

  signOut() {
    // Sign out of Firebase.
    if(this.user_name != "") {
      firebase.database().ref('user_id/' + this.user_id + '/').child('current_character').set("");
    }
  
    this.actualChar = "";
    this.currGame = "";
    firebase.auth().signOut();
    this.user_id = "";
    this.user_name = "";
    this.games = [];
    this.createdItems = [];
  }

  grabHeroes(snapshot: firebase.database.DataSnapshot) {
    this.characters = [];
    snapshot.forEach(function (childSnapshot) {
      this.characters.push(childSnapshot);
    }.bind(this))
  }

  grabGames(snapshot: firebase.database.DataSnapshot) {
    this.games = [];
    snapshot.forEach(function (childSnapshot) {
      this.games.push(childSnapshot);
    }.bind(this))
  }

  grabEvents(snapshot: firebase.database.DataSnapshot) {
    this.events = [];
    this.status = [];
    snapshot.forEach(function (childSnapshot) {
      this.events.push(childSnapshot);
            if (snapshot.child("attending/" + this.user_id).exists()) {
              let x = snapshot.child("attending/" + this.user_id).val()
              this.status.push(x);
            }
            else {
              this.status.push(3)
            }
    }.bind(this))
  }

  grabcreatedItems(snapshot: firebase.database.DataSnapshot) {
    this.createdItems = [];
    snapshot.forEach(function (childSnapshot) {
      this.games.push(childSnapshot);
    }.bind(this))
  }

  //used in service, don't delete
  passCharacter(i: firebase.database.DataSnapshot) {
    this.currentChar.send(i);
    this.currChar = i.key;
  }

  passGame(i : firebase.database.DataSnapshot) {
    this.passGameService.send(i);
    this.currGame = i.key;
    console.log(this.currGame)
  }
  
  passEvent(i : firebase.database.DataSnapshot) {
    this.passGameService.send(i);
  }
//TODO fix this VVVVVV
  passCreatedItems(i : firebase.database.DataSnapshot) {
    this.passGameService.send(i);
    this.currGame = i.key;
    console.log(this.currGame)
  }

  refreshCharacters(): void {
    firebase.database().ref('characters/' + this.user_id + "/").on('value', snapshot => this.grabHeroes(snapshot));
  }

  refreshGames(): void {
    firebase.database().ref('games/').on('value', snapshot => this.grabGames(snapshot));
  }

  refreshEvents(): void {
    firebase.database().ref('events/').on('value', snapshot => this.grabEvents(snapshot));
  }

  //TODO fix this VVVVVVVV
  refreshCreatedItems(): void {
    firebase.database().ref('items/' + this.user_id + "/").on('value', snapshot => this.grabcreatedItems(snapshot));
  }

  setChar(): void {
    firebase.database().ref('user_id/' + this.user_id + '/').child('current_character').set(this.currChar);
    this.actualChar = this.currChar;
  }

  displayEvent(i : firebase.database.DataSnapshot) {
    alert(i.child("desc").val());
  }

  setAttending(i : firebase.database.DataSnapshot, index : number) {
    firebase.database().ref('events/' + i.key + '/attending/' + this.user_id + "/").once("value").then((snapshot) => {
      if (!snapshot.exists()) {
        snapshot.ref.set(1);
        return;
      } 
      let x = snapshot.val();
      switch (x) {
        case 1:
          firebase.database().ref('events/' + i.key + '/').child('attending').child(this.user_id).set(2);
          this.status[index] = 2;
          break;
        case 2:
          firebase.database().ref('events/' + i.key + '/').child('attending').child(this.user_id).set(3);
          this.status[index] = 3;
          break;
        case 3:
          firebase.database().ref('events/' + i.key + '/').child('attending').child(this.user_id).set(1);
          this.status[index] = 1;
          break;
        default:
          break;
      }
    });
  }

}
