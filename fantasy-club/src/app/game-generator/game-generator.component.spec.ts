import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGeneratorComponent } from './game-generator.component';

describe('GameGeneratorComponent', () => {
  let component: GameGeneratorComponent;
  let fixture: ComponentFixture<GameGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
