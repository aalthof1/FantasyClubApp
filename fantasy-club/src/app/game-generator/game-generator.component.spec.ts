import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGeneratorComponent } from './game-generator.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('GameGeneratorComponent', () => {
  let component: GameGeneratorComponent;
  let fixture: ComponentFixture<GameGeneratorComponent>;
  let sidebar: SidebarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameGeneratorComponent ],
      providers : [ SidebarComponent ]
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

  it('should construct', () => {
    sidebar = TestBed.get(SidebarComponent);
    expect(component.app).toEqual(sidebar.app);
    expect(component.userId).toEqual(sidebar.user_id);
    expect(component.currChar).toEqual(sidebar.currChar);
    expect(component.currGame).toEqual(sidebar.currGame);
  });

  it('should create game', () => {
    let oldName: string = (document.getElementById("name2") as HTMLInputElement).value;
    let oldDesc: string = (document.getElementById("desc") as HTMLInputElement).value;
    (document.getElementById("name2") as HTMLInputElement).value = "TestSession";
    (document.getElementById("desc") as HTMLInputElement).value = "TestDesc";
    component.createGame();
    expect(component.name).toEqual("TestSession");
    expect(component.desc).toEqual("TestDesc");
    expect((document.getElementById("name2") as HTMLInputElement).value).toEqual("TestSession");
    expect((document.getElementById("desc") as HTMLInputElement).value).toEqual("TestDesc");
    (document.getElementById("name2") as HTMLInputElement).value = oldName;
    (document.getElementById("desc") as HTMLInputElement).value = oldDesc;
  });

  it('should not create game', () => {
    component.createGame();
    expect((document.getElementById("name2") as HTMLInputElement).value).toEqual("");
    expect((document.getElementById("desc") as HTMLInputElement).value).toEqual("");
  });
});
