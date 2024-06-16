import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductStyleComponent } from './create-product-style.component';

describe('CreateProductStyleComponent', () => {
  let component: CreateProductStyleComponent;
  let fixture: ComponentFixture<CreateProductStyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProductStyleComponent]
    });
    fixture = TestBed.createComponent(CreateProductStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
