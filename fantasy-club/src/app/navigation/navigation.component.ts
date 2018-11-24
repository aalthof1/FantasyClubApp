import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  currentPane = "";
  constructor() { }

  ngOnInit() {
  }

  getCurrentPane() {
    return this.currentPane;
  }

  toggleCharacters() {
    if(this.currentPane == "characters") {
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
      this.currentPane = "";
    } else {
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
      this.currentPane = "characters";
    }
  }

  toggleDR() {
    if(this.currentPane == "diceRoller") {
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
      this.currentPane = "";
    } else {
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
      this.currentPane = "diceRoller";
    }
  }

  toggleSettings() {
    if(this.currentPane == "settings") {
      document.getElementsByClassName("option-pane")[0].classList.add("no-display");
      this.currentPane = "";
    } else {
      document.getElementsByClassName("option-pane")[0].classList.remove("no-display");
      this.currentPane = "settings";
    }
  }

}
