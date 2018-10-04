import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { DicerollerComponent } from '../diceroller/diceroller.component';


describe('Normal Rolls', () => {
  let component: DicerollerComponent;
  let sidebar : SidebarComponent;
  let fixture: ComponentFixture<DicerollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicerollerComponent ],
        providers: [ SidebarComponent ]

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
    expect(component.rolls.length).toEqual(3);
    for(var i = 0; i < component.rolls.length; i++) {
      expect(component.rolls[i]).toBeGreaterThan(0);
      expect(component.rolls[i]).toBeLessThanOrEqual(6);
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
    let total : number = 0;
    for(let i : number = 0; i < component.rolls.length; i++) {
      total += component.rolls[i];
    }
    expect(component.total).toBeLessThanOrEqual(18);
    expect(component.total).toBeGreaterThanOrEqual(3);
    expect(component.total).toEqual(total);
    (document.getElementById("amount") as HTMLInputElement).value = oldAmount.toString();
    (document.getElementById("type") as HTMLInputElement).value = oldRoll.toString();
    (document.getElementById("modifier") as HTMLInputElement).value = oldModifier.toString();
  });
});

describe('Nonscence Rolls', () => {


});

