import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStylesComponent } from './product-styles.component';

describe('ProductStylesComponent', () => {
  let component: ProductStylesComponent;
  let fixture: ComponentFixture<ProductStylesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductStylesComponent]
    });
    fixture = TestBed.createComponent(ProductStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
