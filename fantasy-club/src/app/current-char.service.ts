import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrentCharService {
  private subject = new Subject<any>();
  characterSnap: firebase.database.DataSnapshot;

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
    this.characterSnap = snapshot;
  }
}
