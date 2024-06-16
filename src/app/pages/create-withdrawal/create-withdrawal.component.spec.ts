import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWithdrawalComponent } from './create-withdrawal.component';

describe('CreateWithdrawalComponent', () => {
  let component: CreateWithdrawalComponent;
  let fixture: ComponentFixture<CreateWithdrawalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWithdrawalComponent]
    });
    fixture = TestBed.createComponent(CreateWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
