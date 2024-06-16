import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeasurementUnitsComponent } from './edit-measurement-units.component';

describe('EditMeasurementUnitsComponent', () => {
  let component: EditMeasurementUnitsComponent;
  let fixture: ComponentFixture<EditMeasurementUnitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMeasurementUnitsComponent]
    });
    fixture = TestBed.createComponent(EditMeasurementUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
