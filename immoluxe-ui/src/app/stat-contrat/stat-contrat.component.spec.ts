import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatContratComponent } from './stat-contrat.component';

describe('StatContratComponent', () => {
  let component: StatContratComponent;
  let fixture: ComponentFixture<StatContratComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatContratComponent]
    });
    fixture = TestBed.createComponent(StatContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
