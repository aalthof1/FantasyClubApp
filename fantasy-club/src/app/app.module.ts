import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CharSheetComponent } from './char-sheet/char-sheet.component';
import { DicerollerComponent } from './diceroller/diceroller.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CharSheetComponent,
    DicerollerComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
