import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CritchartComponent } from './critchart.component';

describe('CritchartComponent', () => {
  let component: CritchartComponent;
  let fixture: ComponentFixture<CritchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CritchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CritchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
