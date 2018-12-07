import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorComponent } from './creator.component';
import { SpellcardCreatorComponent } from '../spellcard-creator/spellcard-creator.component';

describe('CreatorComponent', () => {
  let component: CreatorComponent;
  let fixture: ComponentFixture<CreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorComponent, SpellcardCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
