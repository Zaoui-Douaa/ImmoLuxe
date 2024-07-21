import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratListComponent } from './contrat-list.component';

describe('ContratListComponent', () => {
  let component: ContratListComponent;
  let fixture: ComponentFixture<ContratListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratListComponent]
    });
    fixture = TestBed.createComponent(ContratListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
