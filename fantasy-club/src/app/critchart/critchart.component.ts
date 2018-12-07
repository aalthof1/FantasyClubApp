import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-critchart',
  templateUrl: './critchart.component.html',
  styleUrls: ['./critchart.component.css']
})
export class CritchartComponent implements OnInit {

  selectedCrit = "-- Please Select A Damage Type --";
  critRoll: number;
  critResult: String;
  critMod: number;
  critMultiplier: number;


  constructor() { }

  ngOnInit() {
  }

  updateCrit(val) {
    this.selectedCrit = val;
  }

  getSelectedCrit() {
    return this.selectedCrit;
  }

  rollCrit(assassin) {
    if (this.selectedCrit == "-- Please Select A Damage Type --") {

    }
    else {
      this.critMod = parseInt((document.getElementById("critMod") as HTMLInputElement).value);
      if ((document.getElementById("critMod") as HTMLInputElement).value == "") {
        this.critMod = 0;
        (document.getElementById("critMod") as HTMLInputElement).value = '0';
      }
      this.critRoll = (Math.floor(Math.random() * 100) + 1) + this.critMod;
      if (this.critRoll >= 100) {
        this.critRoll = 100;
      }
      if (this.critRoll <= 1) {
        this.critRoll = 1;
      }
      if (assassin == 1) {
        if (this.selectedCrit == "Blunt") {
          assassin = 0;
        }
        if (this.selectedCrit == "Bludgeon") {
          assassin = 0;
        }
        if (this.selectedCrit == "Edged") {
          if (this.critRoll == 1) {
            this.critResult = "Self Hit, roll normal damage on self";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 1) {
            this.critResult = "Blade Broken, use at a -5 to strike and damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 2) {
            this.critResult = "Blade bent, use at a -3 to strike and damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 3) {
            this.critResult = "Blade cracked, use at a -1 to strike and damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 4) {
            this.critResult = "Blade stuck in opponent, 3d6 vs STR to free";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 5 && this.critRoll <= 15) {
            this.critResult = "Double Damage";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 16 && this.critRoll <= 25) {
            this.critResult = "Triple Damage";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 26 && this.critRoll <= 35) {
            this.critResult = "Quadruple Damage";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 36 && this.critRoll <= 40) {
            this.critResult = "Hand severed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 41 && this.critRoll <= 45) {
            this.critResult = "Arm/Wing severed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 46 && this.critRoll <= 50) {
            this.critResult = "Leg/Tail severed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 51 && this.critRoll <= 55) {
            this.critResult = "Groin cloven, incapacitated 20 - HEA minutes (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 56 && this.critRoll <= 60) {
            this.critResult = "Face hit, permanent blindness, blood blinds d4 rounds if helmet, triple damage (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 61 && this.critRoll <= 65) {
            this.critResult = "Head hit, unconscious d4 days, if helmet unconscious d4 minutes, triple damage";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 66 && this.critRoll <= 70) {
            this.critResult = "Kidney destroyed, if both gone death in HEA/2 rounds (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 71 && this.critRoll <= 75) {
            this.critResult = "Internal organs pureed, death in HEA/2 rounds (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 76 && this.critRoll <= 80) {
            this.critResult = "Chest opened, heart and lungs slashed, death in HEA/3 rounds (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 81 && this.critRoll <= 85) {
            this.critResult = "Spine severed, paralyzed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 5;
          }
          if (this.critRoll >= 86 && this.critRoll <= 90) {
            this.critResult = "Head split, INSTANT DEATH, if helmet x4 damage";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 91 && this.critRoll <= 95) {
            this.critResult = "Cleft in twain, INSTANT DEATH";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 96 && this.critRoll <= 100) {
            this.critResult = "Head severed, INSTANT DEATH";
            this.critMultiplier = 6;
          }
        }
        if (this.selectedCrit == "Piercing") {
          if (this.critRoll == 1) {
            this.critResult = "Weapon broken, no damage";
            this.critMultiplier = 0;
          }
          if (this.critRoll == 2) {
            this.critResult = "Point blunted, -2 to strike and damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 3) {
            this.critResult = "Weapon stuck/Bow string snapped, 3d6 vs STR to free/restring";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 4 && this.critRoll <= 9) {
            this.critResult = "Double damage";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 10 && this.critRoll <= 16) {
            this.critResult = "Triple damage";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 17 && this.critRoll <= 24) {
            this.critResult = "Quadruple damage";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 25 && this.critRoll <= 32) {
            this.critResult = "Quintuple damage";
            this.critMultiplier = 5;
          }
          if (this.critRoll >= 33 && this.critRoll <= 36) {
            this.critResult = "Hamstrung, unable to walk for 30 - HEA days";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 37 && this.critRoll <= 40) {
            this.critResult = "Hand impaled, 2d6 vs STR to remove";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 41 && this.critRoll <= 44) {
            this.critResult = "Ear sheared";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 45 && this.critRoll <= 48) {
            this.critResult = "Nose removed";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 49 && this.critRoll <= 52) {
            this.critResult = "Eye hit, permanent blindness";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 53 && this.critRoll <= 57) {
            this.critResult = "Stomach hit (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 58 && this.critRoll <= 62) {
            this.critResult = "Kidney hit, lose 1d4 HEA, if both gone death in HEA/2 rounds (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 63 && this.critRoll <= 67) {
            this.critResult = "Liver pierced, lose 1d6 HEA (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 68 && this.critRoll <= 72) {
            this.critResult = "Lung hit, incapacitated until healed, lose 1d3 HEA, die if other lung gone (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 73 && this.critRoll <= 77) {
            this.critResult = "Groin pierced, incapacitated until healed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 5;
          }
          if (this.critRoll >= 78 && this.critRoll <= 82) {
            this.critResult = "Head hit, if helmet only double damage (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 83 && this.critRoll <= 88) {
            this.critResult = "Heart pierced, INSTANT DEATH (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 89 && this.critRoll <= 94) {
            this.critResult = "Throat pierced, INSTANT DEATH (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 95 && this.critRoll <= 100) {
            this.critResult = "Eye pierced, INSTANT DEATH (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 6;
          }
        }
        if (this.selectedCrit == "Grapple") {
          assassin = 0;
        }
        if (this.selectedCrit == "Linear") {
          if (this.critRoll == 1) {
            this.critResult = "Catastrophic failure, failure based on weapon: Modern Firearm – Freak ricochet, roll weapon damage on self | Muzzle Loader – Weapon explodes, roll weapon damage on self | Plasma Weapon – Weapon overheats and bursts upon firing, no hit | “Laser” Gun – Reverse discharge or freak ricochet, roll damage on self";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 2 && this.critRoll <= 3) {
            this.critResult = "Weapon malfunction, requires repair, hit";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 4 && this.critRoll <= 5) {
            this.critResult = "Weapon mishandled, lose 1 round, hit";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 6 && this.critRoll <= 10) {
            this.critResult = "Double damage";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 11 && this.critRoll <= 16) {
            this.critResult = "Triple damage";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 17 && this.critRoll <= 25) {
            this.critResult = "Quadruple damage";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 26 && this.critRoll <= 31) {
            this.critResult = "Shoulder/Wing hit (Pain, actions involving damaged appendage require 4d6 vs WIL)";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 32 && this.critRoll <= 38) {
            this.critResult = "Leg/Tail hit (Pain, actions involving damaged appendage require 4d6 vs WIL)";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 39 && this.critRoll <= 45) {
            this.critResult = "Arm/Wing hit (Pain, actions involving damaged appendage require 4d6 vs WIL)";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 46 && this.critRoll <= 52) {
            this.critResult = "Knee hit, leg unusable (bleeding, lose 1 DP/round until wounds are bound or healed & Pain, actions involving damaged appendage require 4d6 vs WIL )";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 53 && this.critRoll <= 58) {
            this.critResult = "Elbow hit, arm unusable (bleeding, lose 1 DP/round until wounds are bound or healed & Pain, actions involving damaged appendage require 4d6 vs WIL )";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 59 && this.critRoll <= 60) {
            this.critResult = "Ear removed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 61 && this.critRoll <= 62) {
            this.critResult = "Nose removed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 63 && this.critRoll <= 72) {
            this.critResult = "Stomach hit (bleeding, lose 1 DP/round until wounds are bound or healed & Pain, actions involving damaged appendage require 4d6 vs WIL )";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 73 && this.critRoll <= 76) {
            this.critResult = "Groin hit, incapacitated until healed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 77 && this.critRoll <= 83) {
            this.critResult = "Chest hit, death in HEA rounds";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 84 && this.critRoll <= 90) {
            this.critResult = "Throat hit, death in HEA rounds";
            this.critMultiplier = 5;
          }
          if (this.critRoll >= 91 && this.critRoll <= 95) {
            this.critResult = "Head hit, death in HEA/2 rounds";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 96 && this.critRoll <= 98) {
            this.critResult = "Chest Destroyed, INSTANT DEATH";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 99 && this.critRoll <= 100) {
            this.critResult = "Head Destroyed, INSTANT DEATH";
            this.critMultiplier = 6;
          }
        }
        if (this.selectedCrit == "Artillery") {
          assassin = 0;
        }
      }
      if (assassin == 0) {
        if (this.selectedCrit == "Blunt") {
          if (this.critRoll == 1) {
            this.critResult = "Self Hit, roll normal damage on self";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 2 || this.critRoll == 3) {
            this.critResult = "Weapon Broken, -5 to strike and damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 4 || this.critRoll == 5) {
            this.critResult = "Haft cracked, 50% chance of breaking on use";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 6 || this.critRoll == 7 || this.critRoll == 8 || this.critRoll == 9) {
            this.critResult = "Arms shocked, lose one round";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 10 && this.critRoll <= 50) {
            this.critResult = "Double Damage";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 51 && this.critRoll <= 70) {
            this.critResult = "Triple Damage";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 71 && this.critRoll <= 73) {
            this.critResult = "Weapon or shield broken";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 74 && this.critRoll <= 77) {
            this.critResult = "Armor Damage, lose d2 DV";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 78) {
            this.critResult = "d6 ribs broken";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 79) {
            this.critResult = "Leg/tail broken";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 80) {
            this.critResult = "Arm/wing broken";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 81) {
            this.critResult = "Shoulder/wing damage";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 82) {
            this.critResult = "Arm/wing smashed, unusable";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 83) {
            this.critResult = "Leg/tail smashed, unusable";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 84) {
            this.critResult = "Hand smashed, unusable";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 85) {
            this.critResult = "Chest Hit, winded and gasping d4 rounds";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 86) {
            this.critResult = "Stomach hit, stunned 14 - HEA rounds";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 87) {
            this.critResult = "Groin smashed, stunned 20 - HEA rounds";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 88) {
            this.critResult = "Head hit, stunned d4 minutes, normal damage with helmet";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 89) {
            this.critResult = "Hand severed";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 90) {
            this.critResult = "Face hit, blood blinds d4 rounds if no helmet";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 91) {
            this.critResult = "Face hit, permanently blind if no helmet";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 92) {
            this.critResult = "Head hit, unconscious d4 days, if helmet unconscious d4 minutes and double damage";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 93) {
            this.critResult = "Knee cap shattered, no movement (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 94) {
            this.critResult = "Jaw broken, no speech (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 95) {
            this.critResult = "Kidney destroyed, if both gone death in HEA/2 rounds";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 96) {
            this.critResult = "Internal organs crushed, death in HEA/2 rounds";
            this.critMultiplier = 4;
          }
          if (this.critRoll == 97) {
            this.critResult = "Chest caved in, death in HEA/3 rounds";
            this.critMultiplier = 4;
          }
          if (this.critRoll == 98) {
            this.critResult = "Spine severed, paralyzed";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 99) {
            this.critResult = "Head crushed, INSTANT DEATH, if helmet triple damage";
            this.critMultiplier = 5;
          }
          if (this.critRoll == 100) {
            this.critResult = "Head torn off, INSTANT DEATH";
            this.critMultiplier = 6;
          }
        }
        if (this.selectedCrit == "Bludgeon") {
          if (this.critRoll == 1 || this.critRoll == 2) {
            this.critResult = "Roll again, apply results to self";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 3 && this.critRoll <= 8) {
            this.critResult = "Shoulder hit, 1 point of damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 9 && this.critRoll <= 12) {
            this.critResult = "Shoulder hit and target falls";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 13 && this.critRoll <= 20) {
            this.critResult = "Glancing hit 1d2 damag";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 21 && this.critRoll <= 30) {
            this.critResult = "Stun 1d6 rounds";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 31 && this.critRoll <= 40) {
            this.critResult = "Stun 1d6 rounds and fall";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 41 && this.critRoll <= 70) {
            this.critResult = "Unconscious 1d6 x 10 minutes";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 71 && this.critRoll <= 80) {
            this.critResult = "Unconscious 2d6 hours (roll 1d6: 1-4: no additional result | 5: blind 1d6 days | 6: amnesia 1d6 weeks)";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 81 && this.critRoll <= 86) {
            this.critResult = "Comatose 1d6 days (roll 1d6: 1-4: no additional result | 5: blind 1d6 days | 6: amnesia 1d6 weeks)";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 87 && this.critRoll <= 90) {
            this.critResult = "Coma 1d6 weeks (roll 1d6: 1-4: no additional result | 5: blind 1d6 days | 6: amnesia 1d6 weeks)";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 91 && this.critRoll <= 100) {
            this.critResult = "Death";
            this.critMultiplier = 1;
          }
        }
        if (this.selectedCrit == "Edged") {
          if (this.critRoll == 1) {
            this.critResult = "Self Hit, roll normal damage on self";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 2 || this.critRoll == 3) {
            this.critResult = "Blade Broken, use at a -5 to strike and damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 4 || this.critRoll == 5) {
            this.critResult = "Blade bent, use at a -3 to strike and damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 6 || this.critRoll == 7) {
            this.critResult = "Blade cracked, use at a -1 to strike and damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 8 && this.critRoll <= 10) {
            this.critResult = "Blade stuck in opponent, 3d6 vs STR to free";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 11 && this.critRoll <= 40) {
            this.critResult = "Double Damage";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 41 && this.critRoll <= 60) {
            this.critResult = "Triple Damage";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 61 && this.critRoll <= 72) {
            this.critResult = "Quadruple Damage";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 73 && this.critRoll <= 77) {
            this.critResult = "Weapon or shield broken";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 78 && this.critRoll <= 82) {
            this.critResult = "Armor Damage, lose d4 DV";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 83) {
            this.critResult = "d6 ribs broken";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 84) {
            this.critResult = "Leg/tail broken";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 85) {
            this.critResult = "Arm/Wing broken";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 86) {
            this.critResult = "Shoulder/Wing damage";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 87) {
            this.critResult = "Hand severed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 2;
          }
          if (this.critRoll == 88) {
            this.critResult = "Arm/Wing severed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 89) {
            this.critResult = "Leg/Tail severed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 90) {
            this.critResult = "Groin cloven, incapacitated 20 - HEA minutes (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 91) {
            this.critResult = "Head hit, stunned d4 minutes, normal damage with helmet";
            this.critMultiplier = 3;
          }
          if (this.critRoll == 92) {
            this.critResult = "Face hit, permanent blindness, blood blinds d4 rounds if helmet, triple damage (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll == 93) {
            this.critResult = "Head hit, unconscious d4 days, if helmet unconscious d4 minutes, triple damage";
            this.critMultiplier = 4;
          }
          if (this.critRoll == 94) {
            this.critResult = "Kidney destroyed, if both gone death in HEA/2 rounds (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll == 95) {
            this.critResult = "Internal organs pureed, death in HEA/2 rounds (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll == 96) {
            this.critResult = "Chest opened, heart and lungs slashed, death in HEA/3 rounds (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll == 97) {
            this.critResult = "Spine severed, paralyzed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 5;
          }
          if (this.critRoll == 98) {
            this.critResult = "Head split, INSTANT DEATH, if helmet x4 damage";
            this.critMultiplier = 6;
          }
          if (this.critRoll == 99) {
            this.critResult = "Cleft in twain, INSTANT DEATH";
            this.critMultiplier = 6;
          }
          if (this.critRoll == 100) {
            this.critResult = "Head severed, INSTANT DEATH";
            this.critMultiplier = 6;
          }
        }
        if (this.selectedCrit == "Piercing") {
          if (this.critRoll >= 1 && this.critRoll <= 3) {
            this.critResult = "Weapon broken, no damage";
            this.critMultiplier = 0;
          }
          if (this.critRoll >= 4 && this.critRoll <= 7) {
            this.critResult = "Point blunted, -2 to strike and damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 8 && this.critRoll <= 10) {
            this.critResult = "Weapon stuck/Bow string snapped, 3d6 vs STR to free/restring";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 11 && this.critRoll <= 30) {
            this.critResult = "Double damage";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 31 && this.critRoll <= 45) {
            this.critResult = "Triple damage";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 46 && this.critRoll <= 55) {
            this.critResult = "Quadruple damage";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 56 && this.critRoll <= 60) {
            this.critResult = "Quintuple damage";
            this.critMultiplier = 5;
          }
          if (this.critRoll >= 61 && this.critRoll <= 66) {
            this.critResult = "Armor Damage, lose 1 DV";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 67 && this.critRoll <= 68) {
            this.critResult = "Shoulder/Wing pierced";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 69 && this.critRoll <= 70) {
            this.critResult = "Leg/Tail pierced";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 71 && this.critRoll <= 72) {
            this.critResult = "Arm/Wing pierced";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 73 && this.critRoll <= 74) {
            this.critResult = "Hamstrung, unable to walk for 30 - HEA days";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 75 && this.critRoll <= 76) {
            this.critResult = "Hand impaled, 2d6 vs STR to remove";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 77 && this.critRoll <= 78) {
            this.critResult = "Ear sheared";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 79 && this.critRoll <= 80) {
            this.critResult = "Nose removed";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 81 && this.critRoll <= 82) {
            this.critResult = "Eye hit, permanent blindness";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 83 && this.critRoll <= 84) {
            this.critResult = "Stomach hit (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 85 && this.critRoll <= 86) {
            this.critResult = "Kidney hit, lose 1d4 HEA, if both gone death in HEA/2 rounds (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 87 && this.critRoll <= 88) {
            this.critResult = "Liver pierced, lose 1d6 HEA (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 89 && this.critRoll <= 90) {
            this.critResult = "Lung hit, incapacitated until healed, lose 1d3 HEA, die if other lung gone (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 91 && this.critRoll <= 92) {
            this.critResult = "Groin pierced, incapacitated until healed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 5;
          }
          if (this.critRoll >= 93 && this.critRoll <= 94) {
            this.critResult = "Head hit, if helmet only double damage (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 95 && this.critRoll <= 96) {
            this.critResult = "Heart pierced, INSTANT DEATH (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 97 && this.critRoll <= 98) {
            this.critResult = "Throat pierced, INSTANT DEATH (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 99 && this.critRoll <= 100) {
            this.critResult = "Eye pierced, INSTANT DEATH (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 6;
          }
        }
        if (this.selectedCrit == "Grapple") {
          if (this.critRoll == 1) {
            this.critResult = "Attacker trips and opponent has the option to grapple him without a roll";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 2 || this.critRoll == 3) {
            this.critResult = "Attacker breaks a finger and is unable to use hand until fixed";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 4 || this.critRoll == 5) {
            this.critResult = "Attacker damages armor he is wearing, -1 to all armor DVs";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 6 || this.critRoll == 7 || this.critRoll == 8 || this.critRoll == 9) {
            this.critResult = "Attacker’s finger gets jammed and he cannot use his hand for 1 round";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 10 && this.critRoll <= 50) {
            this.critResult = "Rib cracked, take 1d4 damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 51 && this.critRoll <= 70) {
            this.critResult = "Rib broken, take 1d8 damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 71 && this.critRoll <= 73) {
            this.critResult = "Weapon or shield broken";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 74 && this.critRoll <= 78) {
            this.critResult = "Armor Damage, lose d2 DV";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 79) {
            this.critResult = "Left Leg/tail broken";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 80) {
            this.critResult = "Left Arm/wing broken";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 81) {
            this.critResult = "Left Shoulder/Wing dislocated";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 82) {
            this.critResult = "Arm/Wing smashed, unusable";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 83) {
            this.critResult = "Leg/tail smashed, unusable";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 84) {
            this.critResult = "Hand smashed, unusable";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 85) {
            this.critResult = "Chest Hit, winded and gasping d4 rounds";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 86) {
            this.critResult = "Stomach hit, stunned 14 - HEA rounds";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 87 || this.critRoll == 88) {
            this.critResult = "Groin smashed, stunned 20 – HEA rounds";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 89) {
            this.critResult = "Head hit, stunned 1d4 minutes";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 90) {
            this.critResult = "Face hit, blood blinds d4 rounds if no helmet";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 91) {
            this.critResult = "Face hit, permanently blind if no helmet";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 92) {
            this.critResult = "Head hit, unconscious d4 days, if helmet unconscious d4 minutes";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 93) {
            this.critResult = "Knee cap shattered, no movement";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 94) {
            this.critResult = "Jaw broken, no speech";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 95) {
            this.critResult = "Kidney destroyed, if both gone death in HEA/2 rounds";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 96) {
            this.critResult = "Internal organs crushed, death in HEA/2 rounds";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 97) {
            this.critResult = "Chest caved in, death in HEA/3 rounds";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 98) {
            this.critResult = "Spine severed, paralyzed";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 99) {
            this.critResult = "Head crushed, INSTANT DEATH, if helmet triple damage";
            this.critMultiplier = 1;
          }
          if (this.critRoll == 100) {
            this.critResult = "Head torn off, INSTANT DEATH";
            this.critMultiplier = 1;
          }
        }
        if (this.selectedCrit == "Linear") {
          if (this.critRoll == 1) {
            this.critResult = "Catastrophic failure, failure based on weapon: Modern Firearm – Freak ricochet, roll weapon damage on self | Muzzle Loader – Weapon explodes, roll weapon damage on self | Plasma Weapon – Weapon overheats and bursts upon firing, no hit | “Laser” Gun – Reverse discharge or freak ricochet, roll damage on self";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 2 && this.critRoll <= 3) {
            this.critResult = "Weapon malfunction, requires repair, no hit";
            this.critMultiplier = 0;
          }
          if (this.critRoll >= 4 && this.critRoll <= 6) {
            this.critResult = "Weapon malfunction, requires repair, hit";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 7 && this.critRoll <= 10) {
            this.critResult = "Weapon mishandled, lose 1 round, hit";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 11 && this.critRoll <= 30) {
            this.critResult = "Double damage";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 31 && this.critRoll <= 50) {
            this.critResult = "Triple damage";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 51 && this.critRoll <= 60) {
            this.critResult = "Quadruple damage";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 61 && this.critRoll <= 64) {
            this.critResult = "Shoulder/Wing hit (Pain, actions involving damaged appendage require 4d6 vs WIL)";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 65 && this.critRoll <= 69) {
            this.critResult = "Leg/Tail hit (Pain, actions involving damaged appendage require 4d6 vs WIL)";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 70 && this.critRoll <= 73) {
            this.critResult = "Arm/Wing hit (Pain, actions involving damaged appendage require 4d6 vs WIL)";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 74 && this.critRoll <= 76) {
            this.critResult = "Knee hit, leg unusable (bleeding, lose 1 DP/round until wounds are bound or healed & Pain, actions involving damaged appendage require 4d6 vs WIL )";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 77 && this.critRoll <= 78) {
            this.critResult = "Elbow hit, arm unusable (bleeding, lose 1 DP/round until wounds are bound or healed & Pain, actions involving damaged appendage require 4d6 vs WIL )";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 79 && this.critRoll <= 80) {
            this.critResult = "Ear removed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 81 && this.critRoll <= 82) {
            this.critResult = "Nose removed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 83 && this.critRoll <= 87) {
            this.critResult = "Stomach hit (bleeding, lose 1 DP/round until wounds are bound or healed & Pain, actions involving damaged appendage require 4d6 vs WIL )";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 88 && this.critRoll <= 89) {
            this.critResult = "Groin hit, incapacitated until healed (bleeding, lose 1 DP/round until wounds are bound or healed)";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 90 && this.critRoll <= 93) {
            this.critResult = "Chest hit, death in HEA rounds";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 94 && this.critRoll <= 95) {
            this.critResult = "Throat hit, death in HEA rounds";
            this.critMultiplier = 5;
          }
          if (this.critRoll >= 96 && this.critRoll <= 97) {
            this.critResult = "Head hit, death in HEA/2 rounds";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 98 && this.critRoll <= 99) {
            this.critResult = "Chest Destroyed, INSTANT DEATH";
            this.critMultiplier = 6;
          }
          if (this.critRoll == 100) {
            this.critResult = "Head Destroyed, INSTANT DEATH";
            this.critMultiplier = 6;
          }
        }
        if (this.selectedCrit == "Artillery") {
          if (this.critRoll >= 1 && this.critRoll <= 3) {
            this.critResult = "Weapon breaks, damage firing ship";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 4 && this.critRoll <= 7) {
            this.critResult = "Weapon breaks, no damage";
            this.critMultiplier = 0;
          }
          if (this.critRoll >= 8 && this.critRoll <= 10) {
            this.critResult = "Weapon damaged, unusable";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 11 && this.critRoll <= 30) {
            this.critResult = "Double damage";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 31 && this.critRoll <= 45) {
            this.critResult = "Triple damage";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 46 && this.critRoll <= 55) {
            this.critResult = "Quadruple damage";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 56 && this.critRoll <= 60) {
            this.critResult = "Quintuple damage";
            this.critMultiplier = 5;
          }
          if (this.critRoll >= 61 && this.critRoll <= 66) {
            this.critResult = "Hull Damage, lose 1 ADV";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 67 && this.critRoll <= 68) {
            this.critResult = "Main sail shredded, -50% speed";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 69 && this.critRoll <= 70) {
            this.critResult = "Upper sail shredded, -25% speed";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 71 && this.critRoll <= 72) {
            this.critResult = "Boon sail shredded, -50% turning rate";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 73 && this.critRoll <= 74) {
            this.critResult = "Oars sheared, oaring impossible";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 75 && this.critRoll <= 76) {
            this.critResult = "One weapon hit and destroyed";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 77 && this.critRoll <= 78) {
            this.critResult = "Crow’s nest destroyed";
            this.critMultiplier = 2;
          }
          if (this.critRoll >= 79 && this.critRoll <= 80) {
            this.critResult = "Figurehead destroyed";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 81 && this.critRoll <= 82) {
            this.critResult = "Rigging fouled, 1d6R until ship can move";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 83 && this.critRoll <= 84) {
            this.critResult = "Passage to below deck hit, blocked by debris";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 85 && this.critRoll <= 86) {
            this.critResult = "Attack boat/Life boat destroyed";
            this.critMultiplier = 3;
          }
          if (this.critRoll >= 87 && this.critRoll <= 88) {
            this.critResult = "Cargo bay flooded";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 89 && this.critRoll <= 90) {
            this.critResult = "Helm destroyed, uncontrolled until repaired";
            this.critMultiplier = 4;
          }
          if (this.critRoll >= 91 && this.critRoll <= 92) {
            this.critResult = "Rudder destroyed, uncontrolled until repaired";
            this.critMultiplier = 5;
          }
          if (this.critRoll >= 93 && this.critRoll <= 94) {
            this.critResult = "Cefo killed";
            this.critMultiplier = 6;
          }
          if (this.critRoll >= 95 && this.critRoll <= 96) {
            this.critResult = "Mast falls, ship cannot move";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 97 && this.critRoll <= 98) {
            this.critResult = "Ammo hit, ship explodes and sinks immediately";
            this.critMultiplier = 1;
          }
          if (this.critRoll >= 99 && this.critRoll <= 100) {
            this.critResult = "Keel breaks, ship sinks immediately";
            this.critMultiplier = 1;
          }
        }
      }
    }
  }
}
