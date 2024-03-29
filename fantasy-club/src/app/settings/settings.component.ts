import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  darkMode = false;

  constructor(private ss: SettingsService, private sc: SidebarComponent) { }

  ngOnInit() {
    this.ss.currentDarkMode.subscribe(darkMode => this.darkMode = darkMode);
  }

  toggleDarkMode() {
    this.ss.toggleDarkMode(this.darkMode);
  }

  isUserGM() {
    return this.sc.isUserGM();
  }

  isUserAdmin() {
    return this.sc.isUserAdmin();
  }

  removeBackground() {
    let body = document.getElementsByTagName("body")[0].classList;
    body.remove("moss");
    body.remove("leather");
    body.remove("wood");
    body.remove("scales");
    body.remove("space");
    body.remove("stone");
    body.remove("metal");
  }

  changeBackground(val) {
    this.removeBackground();
    let body = document.getElementsByTagName("body")[0].classList;
    switch(val) {
      case "paper":
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/background").remove();
        }
        return;
      case "mossy cobblestone":
        body.add("moss");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/background").set("moss");
        }
        break;
      case "leather":
        body.add("leather");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/background").set("leather");
        }
        break;
      case "wood":
        body.add("wood");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/background").set("wood");
        }
        break;
      case "scales":
        body.add("scales");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/background").set("scales");
        }
        break;
      case "space":
        body.add("space");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/background").set("space");
        }
        break;
      case "stone":
        body.add("stone");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/background").set("stone");
        }
        break;
      case "metal":
        body.add("metal");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/background").set("metal");
        }
        break;
    }
  }

  removeFont() {
    let body = document.body.classList;
    body.remove("cursive");
    body.remove("courier");
    body.remove("georgia");
  }

  changeFont(val) {
    this.removeFont();
    let body = document.body.classList;
    switch(val) {
      case "default":
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/font").remove();
        }
        return;
      case "cursive":
        body.add("cursive");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/font").set("cursive");
        }
        break;
      case "courier":
        body.add("courier");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/font").set("courier");
        }
        break;
      case "Georgia":
        body.add("georgia");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/font").set("georgia");
        }
        break;
    }
  }

  removeColor() {
    let nav1 = document.getElementsByTagName("mat-toolbar")[0].classList;
    let nav2 = document.getElementsByTagName("mat-toolbar")[1].classList;
    nav1.remove("gray");
    nav2.remove("gray");
    nav1.remove("blue");
    nav2.remove("blue");
    nav1.remove("green");
    nav2.remove("green");
    nav1.remove("red");
    nav2.remove("red");
  }

  changeColor(val) {
    this.removeColor();
    let nav1 = document.getElementsByTagName("mat-toolbar")[0].classList;
    let nav2 = document.getElementsByTagName("mat-toolbar")[1].classList;
    switch(val) {
      case "default":
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/color").remove();
        }
        return;
      case "gray":
        nav1.add("gray");
        nav2.add("gray");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/color").set("gray");
        }
        break;
      case "blue":
        nav1.add("blue");
        nav2.add("blue");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/color").set("blue");
        }
        break;
      case "green":
        nav1.add("green");
        nav2.add("green");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/color").set("green");
        }
        break;
      case "red":
        nav1.add("red");
        nav2.add("red");
        if(this.sc.user_id != "") {
          firebase.database().ref("/user_id/"+this.sc.user_id+"/color").set("red");
        }
        break;
    }
  }

}
