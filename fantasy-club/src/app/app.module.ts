import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CharSheetComponent } from './char-sheet/char-sheet.component';
import { DicerollerComponent } from './diceroller/diceroller.component';
import { CharGeneratorComponent } from './char-generator/char-generator.component';
import { AdminComponent } from './admin/admin.component';
import { GameGeneratorComponent } from './game-generator/game-generator.component';
import { GmComponent } from './gm/gm.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CharSheetComponent,
    DicerollerComponent,
    CharGeneratorComponent,
    AdminComponent,
    GameGeneratorComponent,
    GmComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
