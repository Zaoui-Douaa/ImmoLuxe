import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToDoAgentComponent } from './list-to-do-agent.component';

describe('ListToDoAgentComponent', () => {
  let component: ListToDoAgentComponent;
  let fixture: ComponentFixture<ListToDoAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListToDoAgentComponent]
    });
    fixture = TestBed.createComponent(ListToDoAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
