import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementUnitsComponent } from './measurement-units.component';

describe('MeasurementUnitsComponent', () => {
  let component: MeasurementUnitsComponent;
  let fixture: ComponentFixture<MeasurementUnitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeasurementUnitsComponent]
    });
    fixture = TestBed.createComponent(MeasurementUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
