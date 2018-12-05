import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rulebook',
  templateUrl: './rulebook.component.html',
  styleUrls: ['./rulebook.component.css']
})
export class RulebookComponent implements OnInit {


  selectedContents = "-- Please Select An Option --";

  constructor() { }

  ngOnInit() {
  }

  updateContents(val) {
    this.selectedContents = val;
  }

  getSelectedContents() {
    return this.selectedContents;
  }

  openBook() {
    if(this.selectedContents == "Beginning") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=1', '_blank');
    }
    else if(this.selectedContents == "Creating an Adventurer") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=10', '_blank');
    }
    else if(this.selectedContents == "--Perks") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=14', '_blank');
    }
    else if(this.selectedContents == "--Skills") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=25', '_blank');
    }
    else if(this.selectedContents == "--Equipment") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=30', '_blank');
    }
    else if(this.selectedContents == "Playing an Adventurer") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=33', '_blank');
    }
    else if(this.selectedContents == "--Actions") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=34', '_blank');
    }
    else if(this.selectedContents == "--Using Magic") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=40', '_blank');
    }
    else if(this.selectedContents == "Life on the High Seas") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=49', '_blank');
    }
    else if(this.selectedContents == "Skills") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=58', '_blank');
    }
    else if(this.selectedContents == "--Weapon and Maneuver Skills") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=74', '_blank');
    }
    else if(this.selectedContents == "Jaern: The Planet") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=83', '_blank');
    }
    else if(this.selectedContents == "The Onivero") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=87', '_blank');
    }
    else if(this.selectedContents == "Jaernian Humanoids") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=90', '_blank');
    }
    else if(this.selectedContents == "--Humans") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=90', '_blank');
    }
    else if(this.selectedContents == "--Elves") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=90', '_blank');
    }
    else if(this.selectedContents == "--Dwarves") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=91', '_blank');
    }
    else if(this.selectedContents == "--Orcs") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=93', '_blank');
    }
    else if(this.selectedContents == "--Lizards") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=94', '_blank');
    }
    else if(this.selectedContents == "Marines for Hire") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=96', '_blank');
    }
    else if(this.selectedContents == "Rogues") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=99', '_blank');
    }
    else if(this.selectedContents == "--Creating Poisons") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=99', '_blank');
    }
    else if(this.selectedContents == "--Traps") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=100', '_blank');
    }
    else if(this.selectedContents == "Nomads") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=102', '_blank');
    }
    else if(this.selectedContents == "--Core Incants") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=107', '_blank');
    }
    else if(this.selectedContents == "--Preserver Incants") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=113', '_blank');
    }
    else if(this.selectedContents == "--Troubadour Incants") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=116', '_blank');
    }
    else if(this.selectedContents == "--Seeker Incants") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=121', '_blank');
    }
    else if(this.selectedContents == "--Second Lifer Incants") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=125', '_blank');
    }
    else if(this.selectedContents == "Psionics") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=129', '_blank');
    }
    else if(this.selectedContents == "--Clairsentience") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=131', '_blank');
    }
    else if(this.selectedContents == "--Metacreativity") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=135', '_blank');
    }
    else if(this.selectedContents == "--Psychokinesis") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=140', '_blank');
    }
    else if(this.selectedContents == "--Psycometabolism") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=144', '_blank');
    }
    else if(this.selectedContents == "--Psychoportation") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=148', '_blank');
    }
    else if(this.selectedContents == "--Telepathy") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=152', '_blank');
    }
    else if(this.selectedContents == "Elemental Magic") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=157', '_blank');
    }
    else if(this.selectedContents == "--Defer") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=159', '_blank');
    }
    else if(this.selectedContents == "--Revocation") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=160', '_blank');
    }
    else if(this.selectedContents == "--Common Magic") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=161', '_blank');
    }
    else if(this.selectedContents == "--Movement") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=164', '_blank');
    }
    else if(this.selectedContents == "--Tongues and Scripts") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=166', '_blank');
    }
    else if(this.selectedContents == "--Shadow Magics") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=168', '_blank');
    }
    else if(this.selectedContents == "--Interdictions") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=170', '_blank');
    }
    else if(this.selectedContents == "--Earth Magic") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=172', '_blank');
    }
    else if(this.selectedContents == "----Earth Magics") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=173', '_blank');
    }
    else if(this.selectedContents == "----Magnetism") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=175', '_blank');
    }
    else if(this.selectedContents == "----Hindrances") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=177', '_blank');
    }
    else if(this.selectedContents == "----Necromancy/Time") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=179', '_blank');
    }
    else if(this.selectedContents == "----Stone Magics") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=181', '_blank');
    }
    else if(this.selectedContents == "----War Magics") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=183', '_blank');
    }
    else if(this.selectedContents == "----True Necromancy") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=185', '_blank');
    }
    else if(this.selectedContents == "----Forging") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=188', '_blank');
    }
    else if(this.selectedContents == "--Fire Magic") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=189', '_blank');
    }
    else if(this.selectedContents == "----Fire Magics") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=190', '_blank');
    }
    else if(this.selectedContents == "----Illumination") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=192', '_blank');
    }
    else if(this.selectedContents == "----Conjurations") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=194', '_blank');
    }
    else if(this.selectedContents == "----Mind Twisters") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=196', '_blank');
    }
    else if(this.selectedContents == "----Chaos Magics") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=198', '_blank');
    }
    else if(this.selectedContents == "--Air Magic") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=201', '_blank');
    }
    else if(this.selectedContents == "----Air Magics") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=202', '_blank');
    }
    else if(this.selectedContents == "----Vision") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=204', '_blank');
    }
    else if(this.selectedContents == "----Scrying") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=206', '_blank');
    }
    else if(this.selectedContents == "----Dimensions") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=208', '_blank');
    }
    else if(this.selectedContents == "----Air Forms") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=210', '_blank');
    }
    else if(this.selectedContents == "----Smoke") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=212', '_blank');
    }
    else if(this.selectedContents == "----Illusions") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=214', '_blank');
    }
    else if(this.selectedContents == "--Water Magic") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=216', '_blank');
    }
    else if(this.selectedContents == "----Water Magics") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=217', '_blank');
    }
    else if(this.selectedContents == "----Wardings") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=219', '_blank');
    }
    else if(this.selectedContents == "----Changings") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=221', '_blank');
    }
    else if(this.selectedContents == "----Charms") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=223', '_blank');
    }
    else if(this.selectedContents == "Divine Magic") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=225', '_blank');
    }
    else if(this.selectedContents == "--Ceremonies") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=227', '_blank');
    }
    else if(this.selectedContents == "--Revocation") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=229', '_blank');
    }
    else if(this.selectedContents == "--Defer") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=230', '_blank');
    }
    else if(this.selectedContents == "--Blessings") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=231', '_blank');
    }
    else if(this.selectedContents == "--Fabrications") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=233', '_blank');
    }
    else if(this.selectedContents == "--Detections") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=235', '_blank');
    }
    else if(this.selectedContents == "--Influences") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=237', '_blank');
    }
    else if(this.selectedContents == "Anubis") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=240', '_blank');
    }
    else if(this.selectedContents == "--Tomboloko") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=243', '_blank');
    }
    else if(this.selectedContents == "--Animotusi") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=245', '_blank');
    }
    else if(this.selectedContents == "--Trovisavi") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=247', '_blank');
    }
    else if(this.selectedContents == "--Kadavros") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=249', '_blank');
    }
    else if(this.selectedContents == "--Faciligo") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=251', '_blank');
    }
    else if(this.selectedContents == "At'ena") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=253', '_blank');
    }
    else if(this.selectedContents == "Isis") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=256', '_blank');
    }
    else if(this.selectedContents == "--Recover") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=260', '_blank');
    }
    else if(this.selectedContents == "--Heal") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=261', '_blank');
    }
    else if(this.selectedContents == "--Assist") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=263', '_blank');
    }
    else if(this.selectedContents == "--Helping") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=265', '_blank');
    }
    else if(this.selectedContents == "Neptune") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=267', '_blank');
    }
    else if(this.selectedContents == "--Underwater") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=271', '_blank');
    }
    else if(this.selectedContents == "--Sea Form") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=273', '_blank');
    }
    else if(this.selectedContents == "--Aquatic Life") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=274', '_blank');
    }
    else if(this.selectedContents == "--HydroMorph") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=276', '_blank');
    }
    else if(this.selectedContents == "Orus") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=278', '_blank');
    }
    else if(this.selectedContents == "--Love") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=281', '_blank');
    }
    else if(this.selectedContents == "--Hate") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=283', '_blank');
    }
    else if(this.selectedContents == "--Courage") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=285', '_blank');
    }
    else if(this.selectedContents == "--Fear") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=287', '_blank');
    }
    else if(this.selectedContents == "--Disinterest") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=289', '_blank');
    }
    else if(this.selectedContents == "Osiris") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=291', '_blank');
    }
    else if(this.selectedContents == "--Wilderness") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=294', '_blank');
    }
    else if(this.selectedContents == "--Animal Form") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=296', '_blank');
    }
    else if(this.selectedContents == "--Land Life") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=297', '_blank');
    }
    else if(this.selectedContents == "--Land Morph") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=299', '_blank');
    }
    else if(this.selectedContents == "Ra") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=301', '_blank');
    }
    else if(this.selectedContents == "--Compile") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=305', '_blank');
    }
    else if(this.selectedContents == "--Decompile") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=307', '_blank');
    }
    else if(this.selectedContents == "--Disincorporate") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=309', '_blank');
    }
    else if(this.selectedContents == "--Encorporate") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=311', '_blank');
    }
    else if(this.selectedContents == "--Order") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=312', '_blank');
    }
    else if(this.selectedContents == "Rudri") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=314', '_blank');
    }
    else if(this.selectedContents == "--Decay") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=318', '_blank');
    }
    else if(this.selectedContents == "--Forge") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=320', '_blank');
    }
    else if(this.selectedContents == "--Encure") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=322', '_blank');
    }
    else if(this.selectedContents == "--Discure") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=323', '_blank');
    }
    else if(this.selectedContents == "Tarus") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=325', '_blank');
    }
    else if(this.selectedContents == "--Fosiantau") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=331', '_blank');
    }
    else if(this.selectedContents == "--Mensa") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=333', '_blank');
    }
    else if(this.selectedContents == "--Mezuri") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=335', '_blank');
    }
    else if(this.selectedContents == "--Sciovorto") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=337', '_blank');
    }
    else if(this.selectedContents == "T'or") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=339', '_blank');
    }
    else if(this.selectedContents == "--Body") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=343', '_blank');
    }
    else if(this.selectedContents == "--Shield/Defense") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=345', '_blank');
    }
    else if(this.selectedContents == "--Weapon/Offensive") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=347', '_blank');
    }
    else if(this.selectedContents == "--Mind") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=349', '_blank');
    }
    else if(this.selectedContents == "--Righteousness") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=351', '_blank');
    }
    else if(this.selectedContents == "--True Justice") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=353', '_blank');
    }
    else if(this.selectedContents == "Almar") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=355', '_blank');
    }
    else if(this.selectedContents == "--Soul") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=358', '_blank');
    }
    else if(this.selectedContents == "--Emotion") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=360', '_blank');
    }
    else if(this.selectedContents == "--Energy") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=362', '_blank');
    }
    else if(this.selectedContents == "--Power") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=364', '_blank');
    }
    else if(this.selectedContents == "Vormaxia") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=366', '_blank');
    }
    else if(this.selectedContents == "--Memory") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=369', '_blank');
    }
    else if(this.selectedContents == "--Wisdom") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=371', '_blank');
    }
    else if(this.selectedContents == "--Language") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=373', '_blank');
    }
    else if(this.selectedContents == "--Thought") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=375', '_blank');
    }
    else if(this.selectedContents == "Zepherin") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=377', '_blank');
    }
    else if(this.selectedContents == "--Strength") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=380', '_blank');
    }
    else if(this.selectedContents == "--Appearance") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=382', '_blank');
    }
    else if(this.selectedContents == "--Health") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=384', '_blank');
    }
    else if(this.selectedContents == "--Speed") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=386', '_blank');
    }
    else if(this.selectedContents == "Advanced Magic") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=388', '_blank');
    }
    else if(this.selectedContents == "Magical Items and Artifacts") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=392', '_blank');
    }
    else if(this.selectedContents == "Creating and Playing Actors") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=405', '_blank');
    }
    else if(this.selectedContents == "Creating Creatures") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=407', '_blank');
    }
    else if(this.selectedContents == "--Creature Ability Descriptions") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=411', '_blank');
    }
    else if(this.selectedContents == "--Creature Disability Descriptions") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=421', '_blank');
    }
    else if(this.selectedContents == "Creatures") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=426', '_blank');
    }
    else if(this.selectedContents == "--Creature List") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=427', '_blank');
    }
    else if(this.selectedContents == "Creating Adventures") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=459', '_blank');
    }
    else if(this.selectedContents == "Judging Adventures") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=463', '_blank');
    }
    else if(this.selectedContents == "Designer Notes") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=474', '_blank');
    }
    else if(this.selectedContents == "Critical Hit Charts") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=477', '_blank');
    }
    else if(this.selectedContents == "--Blunt and Bludgeon") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=477', '_blank');
    }
    else if(this.selectedContents == "--Edged and Piercing") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=478', '_blank');
    }
    else if(this.selectedContents == "--Grapple and Linear") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=479', '_blank');
    }
    else if(this.selectedContents == "--Artillery") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=480', '_blank');
    }
    else if(this.selectedContents == "Appendix A: Spell Clarifications") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=481', '_blank');
    }
    else if(this.selectedContents == "Appendix B: Running the Gods") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=484', '_blank');
    }
    else if(this.selectedContents == "Appendix C: Quick Start") {
      window.open('https://centralia.aquest.com/lib/exe/fetch.php?media=aq_manual_20160922.pdf#page=491', '_blank');
    }
    
    

  }

}
