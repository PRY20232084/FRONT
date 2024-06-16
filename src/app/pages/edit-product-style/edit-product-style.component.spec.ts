import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductStyleComponent } from './edit-product-style.component';

describe('EditProductStyleComponent', () => {
  let component: EditProductStyleComponent;
  let fixture: ComponentFixture<EditProductStyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductStyleComponent]
    });
    fixture = TestBed.createComponent(EditProductStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
