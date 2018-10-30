import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellcardCreatorComponent } from './spellcard-creator.component';

describe('SpellcardCreatorComponent', () => {
  let component: SpellcardCreatorComponent;
  let fixture: ComponentFixture<SpellcardCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellcardCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellcardCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
