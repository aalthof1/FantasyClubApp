import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { DicerollerComponent } from '../diceroller/diceroller.component';
import { IfStmt } from '@angular/compiler';
import { IterableChangeRecord_ } from '@angular/core/src/change_detection/differs/default_iterable_differ';


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

  it('should increase amount to 1', () => {
    let oldAmount: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    (document.getElementById("amount") as HTMLInputElement).value = "0";
    component.DiceRoller();
    expect(component.amount).toEqual(1);
    expect((document.getElementById("amount") as HTMLInputElement).value).toEqual("1");
    (document.getElementById("amount") as HTMLInputElement).value = oldAmount.toString();
  });

  it('should increase type to 2', () => {
    let oldRoll: number = parseInt((document.getElementById("type") as HTMLInputElement).value);
    (document.getElementById("type") as HTMLInputElement).value = "0";
    component.DiceRoller();
    expect(component.type).toEqual(2);
    expect((document.getElementById("type") as HTMLInputElement).value).toEqual("2");
    (document.getElementById("type") as HTMLInputElement).value = oldRoll.toString();
  });

  it('should also increase type to 2', () => {
    let oldRoll: number = parseInt((document.getElementById("type") as HTMLInputElement).value);
    (document.getElementById("type") as HTMLInputElement).value = "1";
    component.DiceRoller();
    expect(component.type).toEqual(2);
    expect((document.getElementById("type") as HTMLInputElement).value).toEqual("2");
    (document.getElementById("type") as HTMLInputElement).value = oldRoll.toString();
  });

  it('amount should not be null', () => {
    let oldAmount: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    (document.getElementById("amount") as HTMLInputElement).value = "";
    component.DiceRoller();
    expect(component.amount).toEqual(1);
    expect((document.getElementById("amount") as HTMLInputElement).value).toEqual("1");
    (document.getElementById("amount") as HTMLInputElement).value = oldAmount.toString();
  });

  it('type should not be null', () => {
    let oldRoll: number = parseInt((document.getElementById("type") as HTMLInputElement).value);
    (document.getElementById("type") as HTMLInputElement).value = "";
    component.DiceRoller();
    expect(component.type).toEqual(2);
    expect((document.getElementById("type") as HTMLInputElement).value).toEqual("2");
    (document.getElementById("type") as HTMLInputElement).value = oldRoll.toString();
  });

  it('modifier should not be null', () => {
    let oldRoll: number = parseInt((document.getElementById("modifier") as HTMLInputElement).value);
    (document.getElementById("modifier") as HTMLInputElement).value = "";
    component.DiceRoller();
    expect(component.mod).toEqual(0);
    expect((document.getElementById("modifier") as HTMLInputElement).value).toEqual("0");
    (document.getElementById("modifier") as HTMLInputElement).value = oldRoll.toString();
  });

  it('amount is not over 100', () => {
    let oldRoll: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    (document.getElementById("amount") as HTMLInputElement).value = "101";
    component.DiceRoller();
    expect(component.amount).toEqual(100);
    expect((document.getElementById("amount") as HTMLInputElement).value).toEqual("100");
    (document.getElementById("amount") as HTMLInputElement).value = oldRoll.toString();
  });    

  it('amount overflows reset to default', () => {
    let invalid: number = 17972211111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111;
    let oldRoll: number = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    (document.getElementById("amount") as HTMLInputElement).value = ("" + invalid);
    component.DiceRoller();
    expect(component.amount).toEqual(1);
    expect((document.getElementById("amount") as HTMLInputElement).value).toEqual("1");
    (document.getElementById("amount") as HTMLInputElement).value = oldRoll.toString();
  }); 

  it('type overflows reset to default', () => {
    let invalid: number = 17972211111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111;
    let oldRoll: number = parseInt((document.getElementById("type") as HTMLInputElement).value);
    (document.getElementById("type") as HTMLInputElement).value = ("" + invalid);
    component.DiceRoller();
    expect(component.type).toEqual(2);
    expect((document.getElementById("type") as HTMLInputElement).value).toEqual("2");
    (document.getElementById("type") as HTMLInputElement).value = oldRoll.toString();
  }); 

  it('modifier overflows reset to default', () => {
    let invalid: number = 17972211111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111;
    let oldRoll: number = parseInt((document.getElementById("modifier") as HTMLInputElement).value);
    (document.getElementById("modifier") as HTMLInputElement).value = ("" + invalid);
    component.DiceRoller();
    expect(component.mod).toEqual(0);
    expect((document.getElementById("modifier") as HTMLInputElement).value).toEqual("0");
    (document.getElementById("modifier") as HTMLInputElement).value = oldRoll.toString();
  }); 

});

