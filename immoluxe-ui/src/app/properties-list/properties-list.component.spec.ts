import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyListComponent } from './properties-list.component';

describe('PropertyListComponent', () => {
  let component: PropertyListComponent;
  let fixture: ComponentFixture<PropertyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyListComponent]
    });
    fixture = TestBed.createComponent(PropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});