import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

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
        return;
      case "mossy cobblestone":
        body.add("moss");
        break;
      case "leather":
        body.add("leather");
        break;
      case "wood":
        body.add("wood");
        break;
      case "scales":
        body.add("scales");
        break;
      case "space":
        body.add("space");
        break;
      case "stone":
        body.add("stone");
        break;
      case "metal":
        body.add("metal");
        break;
    }
  }

}
