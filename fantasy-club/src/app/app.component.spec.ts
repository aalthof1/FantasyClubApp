import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CharSheetComponent } from './char-sheet/char-sheet.component';
import { AdminComponent } from './admin/admin.component';
import { DicerollerComponent } from './diceroller/diceroller.component';
import { GameGeneratorComponent } from './game-generator/game-generator.component';
import { GmComponent } from './gm/gm.component';
import { CharGeneratorComponent } from './char-generator/char-generator.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SidebarComponent, CharSheetComponent, 
        AdminComponent, DicerollerComponent, GameGeneratorComponent, 
        GmComponent, CharGeneratorComponent
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
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to fantasy-club!');
  }));
});
