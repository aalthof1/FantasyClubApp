import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { CharGeneratorComponent } from '../char-generator/char-generator.component';
import { CharSheetComponent } from '../char-sheet/char-sheet.component';
import { AppComponent } from '../app.component';
import { DicerollerComponent } from '../diceroller/diceroller.component';
import { AdminComponent } from '../admin/admin.component';
import { GameGeneratorComponent } from '../game-generator/game-generator.component';
import { GmComponent } from '../gm/gm.component';


describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, SidebarComponent, CharSheetComponent, 
        AdminComponent, DicerollerComponent, GameGeneratorComponent, 
        GmComponent, CharGeneratorComponent
      ],
      providers: [ SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
