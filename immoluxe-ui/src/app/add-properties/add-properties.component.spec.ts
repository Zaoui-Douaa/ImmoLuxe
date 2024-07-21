import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPropertyComponent } from './add-properties.component';
import { FormsModule } from '@angular/forms';


describe('AddPropertyComponent', () => {
  let component: AddPropertyComponent;
  let fixture: ComponentFixture<AddPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPropertyComponent]
    });
    fixture = TestBed.createComponent(AddPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});