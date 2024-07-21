import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsContratComponent } from './show-details-contrat.component';

describe('ShowDetailsContratComponent', () => {
  let component: ShowDetailsContratComponent;
  let fixture: ComponentFixture<ShowDetailsContratComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDetailsContratComponent]
    });
    fixture = TestBed.createComponent(ShowDetailsContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
