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
import { NpclistComponent } from './npclist/npclist.component';
import { NpcCreatorComponent } from './npc-creator/npc-creator.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { MobileComponent } from './mobile/mobile.component';
import { MatToolbar } from '@angular/material/toolbar';
import { SettingsComponent } from './settings/settings.component';
import { EventsComponent } from './events/events.component';
import { CreatorComponent } from './creator/creator.component';
import { RulebookComponent } from './rulebook/rulebook.component';
import { CritchartComponent } from './critchart/critchart.component';
import { MatCard } from '@angular/material/card';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SidebarComponent, CharSheetComponent, 
        AdminComponent, DicerollerComponent, GameGeneratorComponent, 
        GmComponent, CharGeneratorComponent, SpellcardListComponent,
        ItemCreatorComponent, ItemlistComponent, CharViewerComponent,
        SpellcardCreatorComponent, TrapCreatorComponent, NpclistComponent,
        NpcCreatorComponent, ChatboxComponent, MobileComponent, MatToolbar,
        SettingsComponent, EventsComponent, CreatorComponent, RulebookComponent,
        CritchartComponent, MatCard
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

  it('should initialize id', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.user_id).toEqual("");
  });

  it('should initialize user_name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.user_name).toEqual("");
  });

  it('should define HTML headline', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.headline).toBeUndefined();
  });

  it('should define app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.app).toBeUndefined();
  });
});
