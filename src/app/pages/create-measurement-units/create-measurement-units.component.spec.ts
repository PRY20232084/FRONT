import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeasurementUnitsComponent } from './create-measurement-units.component';

describe('CreateMeasurementUnitsComponent', () => {
  let component: CreateMeasurementUnitsComponent;
  let fixture: ComponentFixture<CreateMeasurementUnitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMeasurementUnitsComponent]
    });
    fixture = TestBed.createComponent(CreateMeasurementUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
