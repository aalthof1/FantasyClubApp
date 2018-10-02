import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CharSheetComponent } from './char-sheet/char-sheet.component';
import { DicerollerComponent } from './diceroller/diceroller.component';
import { CharGeneratorComponent } from './char-generator/char-generator.component';
<<<<<<< HEAD
import { AdminComponent } from './admin/admin.component';
=======
import { GameGeneratorComponent } from './game-generator/game-generator.component';
>>>>>>> 2053cba5dc8ee98dd45364eb84755d8c9c79eeab

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CharSheetComponent,
    DicerollerComponent,
    CharGeneratorComponent,
<<<<<<< HEAD
    AdminComponent,
=======
    GameGeneratorComponent,
>>>>>>> 2053cba5dc8ee98dd45364eb84755d8c9c79eeab
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
