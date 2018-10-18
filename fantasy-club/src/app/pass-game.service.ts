import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassGameService {

  constructor() { }

  private subject = new Subject<any>();
  gameSnap: firebase.database.DataSnapshot;

  send(snapshot) {
    this.subject.next({data : snapshot})
  }

  clear() {
    this.subject.next();
  }

  get() {
    return this.subject.asObservable();
  }

  insertSnapshot(snapshot: firebase.database.DataSnapshot): void {
    this.gameSnap = snapshot;
  }

}
