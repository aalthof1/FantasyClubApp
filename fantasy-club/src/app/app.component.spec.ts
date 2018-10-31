import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CharSheetComponent } from './char-sheet/char-sheet.component';
import { AdminComponent } from './admin/admin.component';
import { DicerollerComponent } from './diceroller/diceroller.component';
import { GameGeneratorComponent } from './game-generator/game-generator.component';
import { GmComponent } from './gm/gm.component';
import { CharGeneratorComponent } from './char-generator/char-generator.component';
import { SpellcardListComponent } from './spellcard-list/spellcard-list.component';
import { ItemCreatorComponent } from './item-creator/item-creator.component';
import { ItemlistComponent } from './itemlist/itemlist.component';
import { CharViewerComponent } from './char-viewer/char-viewer.component';
import { SpellcardCreatorComponent } from './spellcard-creator/spellcard-creator.component';
import { TrapCreatorComponent } from './trap-creator/trap-creator.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SidebarComponent, CharSheetComponent, 
        AdminComponent, DicerollerComponent, GameGeneratorComponent, 
        GmComponent, CharGeneratorComponent, SpellcardListComponent,
        ItemCreatorComponent, ItemlistComponent, CharViewerComponent,
        SpellcardCreatorComponent, TrapCreatorComponent
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'fantasy-club'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('fantasy-club');
  }));
});
