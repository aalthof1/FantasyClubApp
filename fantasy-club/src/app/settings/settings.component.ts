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

}
