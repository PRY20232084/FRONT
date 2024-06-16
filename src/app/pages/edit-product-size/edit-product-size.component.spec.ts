import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductSizeComponent } from './edit-product-size.component';

describe('EditProductSizeComponent', () => {
  let component: EditProductSizeComponent;
  let fixture: ComponentFixture<EditProductSizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductSizeComponent]
    });
    fixture = TestBed.createComponent(EditProductSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
