import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { CharSheetComponent } from '../char-sheet/char-sheet.component';
import { DicerollerComponent } from '../diceroller/diceroller.component';
import { CharGeneratorComponent } from '../char-generator/char-generator.component';
import { AdminComponent } from '../admin/admin.component';
import { GameGeneratorComponent } from '../game-generator/game-generator.component';
import { GmComponent } from '../gm/gm.component';
import { AppModule } from '../app.module';

describe('Normal Rolls', () => {
  let component: DicerollerComponent;
  let fixture: ComponentFixture<DicerollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicerollerComponent, SidebarComponent, CharSheetComponent, CharGeneratorComponent, AdminComponent,
        GameGeneratorComponent, GmComponent ],
        imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicerollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct Amount' , () => {
    let oldAmount: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    (document.getElementById("amount") as HTMLInputElement).value = "3";
    component.DiceRoller();
    expect(component.amount).toEqual(3);
    (document.getElementById("amount") as HTMLInputElement).value = oldAmount.toString();
  });

  it('should get correct Type' , () => {
    let oldRoll: number = parseInt((document.getElementById("type") as HTMLInputElement).value);
    (document.getElementById("type") as HTMLInputElement).value = "6";
    component.DiceRoller();
    expect(component.type).toEqual(6);
    (document.getElementById("type") as HTMLInputElement).value = oldRoll.toString();
  });

  it('should get correct positive Modifier' , () => {
    let oldRoll: number = parseInt((document.getElementById("modifier") as HTMLInputElement).value);
    (document.getElementById("modifier") as HTMLInputElement).value = "1";
    component.DiceRoller();
    expect(component.mod).toEqual(1);
    (document.getElementById("modifier") as HTMLInputElement).value = oldRoll.toString();
  });

  it('should get correct negative Modifier' , () => {
    let oldRoll: number = parseInt((document.getElementById("modifier") as HTMLInputElement).value);
    (document.getElementById("modifier") as HTMLInputElement).value = "-1";
    component.DiceRoller();
    expect(component.mod).toEqual(-1);
    (document.getElementById("modifier") as HTMLInputElement).value = oldRoll.toString();
  });

  it('should get correct Rolls array' , () => {
    let oldAmount: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    (document.getElementById("amount") as HTMLInputElement).value = "3";
    let oldRoll: number = parseInt((document.getElementById("type") as HTMLInputElement).value);
    (document.getElementById("type") as HTMLInputElement).value = "6";
    let oldModifier: number = parseInt((document.getElementById("modifier") as HTMLInputElement).value);
    (document.getElementById("modifier") as HTMLInputElement).value = "1";
    component.DiceRoller();
    for(var i = 0; i < component.rolls.length; i++) {
      let temp : string = document.getElementsByClassName("rolls")[i].innerHTML;
      let spaceChar : number = temp.lastIndexOf(' ');
      let temp2 : string = temp.substring(spaceChar, temp.length);
      let int : number = parseInt(temp2);
      expect(component.rolls[i]).toEqual(int);
    }
    (document.getElementById("amount") as HTMLInputElement).value = oldAmount.toString();
    (document.getElementById("type") as HTMLInputElement).value = oldRoll.toString();
    (document.getElementById("modifier") as HTMLInputElement).value = oldModifier.toString();
  });

  it('should get correct Total' , () => {
    let oldAmount: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    (document.getElementById("amount") as HTMLInputElement).value = "3";
    let oldRoll: number = parseInt((document.getElementById("modifier") as HTMLInputElement).value);
    (document.getElementById("modifier") as HTMLInputElement).value = "6";
    let oldModifier: number = parseInt((document.getElementById("type") as HTMLInputElement).value);
    (document.getElementById("type") as HTMLInputElement).value = "1";
    component.DiceRoller();
    expect(component.total).toEqual(parseInt(document.getElementById("total").innerHTML));
    (document.getElementById("amount") as HTMLInputElement).value = oldAmount.toString();
    (document.getElementById("type") as HTMLInputElement).value = oldRoll.toString();
    (document.getElementById("modifier") as HTMLInputElement).value = oldModifier.toString();
  });
});

describe('Nonscence Rolls', () => {


});

