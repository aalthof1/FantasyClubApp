import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

    darkMode = false;
    private darkModeSource = new BehaviorSubject<boolean>(this.darkMode);
    currentDarkMode = this.darkModeSource.asObservable();

    constructor() { }

    toggleDarkMode(darkMode: boolean) {
        this.darkModeSource.next(!darkMode);
    }

}
