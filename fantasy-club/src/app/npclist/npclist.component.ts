import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-npclist',
  templateUrl: './npclist.component.html',
  styleUrls: ['./npclist.component.css']
})
export class NpclistComponent implements OnInit {

  npcToggle: boolean = false;
  NPCs: Array<firebase.database.DataSnapshot> = [];
  selectedNPC: firebase.database.DataSnapshot = null;
  editDisplay: boolean = false;
  shareMenuToggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  NPCButton() {
    this.npcToggle = !this.npcToggle;
    if (this.npcToggle) {
      this.fillnpc()
    }
  }

  fillnpc() {
    firebase.database().ref("/NPCs/" + firebase.auth().currentUser.uid).on("value",
      function (snapshot) {
        this.NPCs = [];
        snapshot.forEach(function (childsnap) {
          this.NPCs.push(childsnap);
        }.bind(this))
      }.bind(this))
  }

  setSelectedNPC(x: firebase.database.DataSnapshot) {
    this.selectedNPC = x;
  }

  displayEditor() {
    if (firebase.auth().currentUser == null) {
      return;
    }
    this.editDisplay = true;
  }

  updateNPC() {
    let x: HTMLInputElement = document.getElementById("NPCeditName") as HTMLInputElement;
    let y: HTMLTextAreaElement = document.getElementById("NPCeditDesc") as HTMLTextAreaElement;
    let agi = parseInt((document.getElementById("agi") as HTMLInputElement).value);
    let com = parseInt((document.getElementById("com") as HTMLInputElement).value);
    let cse = parseInt((document.getElementById("cse") as HTMLInputElement).value);
    let dp = parseInt((document.getElementById("dp") as HTMLInputElement).value);
    let hea = parseInt((document.getElementById("hea") as HTMLInputElement).value);
    let int = parseInt((document.getElementById("int") as HTMLInputElement).value);
    let per = parseInt((document.getElementById("per") as HTMLInputElement).value);
    let pwr = parseInt((document.getElementById("pwr") as HTMLInputElement).value);
    let str = parseInt((document.getElementById("str") as HTMLInputElement).value);
    let wil = parseInt((document.getElementById("wil") as HTMLInputElement).value);


    if (x.value == "") {
      return;
    }
    //committed to updating the Spell
    let cID = this.selectedNPC.child("creatorID").val();
    let cName = this.selectedNPC.child("creatorName").val();
    this.selectedNPC.ref.remove();

    firebase.database().ref("NPCs/" + firebase.auth().currentUser.uid + "/" + x.value).set(
      {
        creatorName: cName,
        desc: y.value,
        agi: agi,
        com: com,
        cse: cse,
        dp: dp,
        hea: hea,
        int: int,
        per: per,
        pwr: pwr,
        str: str,
        wil: wil
      }
    )


    this.setSelectedNPC(undefined);
    this.editDisplay = false;
  }
  removeNPC(x: firebase.database.DataSnapshot) {
    x.ref.remove()
  }

  shareSpell() {
    var sharee = document.getElementById("shareSpell") as HTMLInputElement;
    let cName = this.selectedNPC.child("creatorName").val();
    let descr = this.selectedNPC.child("desc").val();
    let agi = this.selectedNPC.child('agi').val()
    let com = this.selectedNPC.child('com').val()
    let cse = this.selectedNPC.child('cse').val()
    let dp = this.selectedNPC.child('dp').val()
    let hea = this.selectedNPC.child('hea').val()
    let int = this.selectedNPC.child('int').val()
    let per = this.selectedNPC.child('per').val()
    let pwr = this.selectedNPC.child('pwr').val()
    let str = this.selectedNPC.child('str').val()
    let wil = this.selectedNPC.child('wil').val()

    let gmID: string = undefined;

    firebase.database().ref("user_id/").once("value").then(function (snapshot) {
      snapshot.forEach(function (childsnap) {
        if (childsnap.child("name").val() == sharee.value) {
          gmID = childsnap.key;
          firebase.database().ref('NPCs/' + gmID + "/" + this.selectedNPC.key).set(
            {
              creatorName: cName,
              desc: descr,
              agi: agi,
              com: com,
              cse: cse,
              dp: dp,
              hea: hea,
              int: int,
              per: per,
              pwr: pwr,
              str: str,
              wil: wil
            }
          )
        }
      }.bind(this))
    }.bind(this))

  }
}
