import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W2mSpinnerComponent } from './w2m-spinner.component';

describe('W2mSpinnerComponent', () => {
  let component: W2mSpinnerComponent;
  let fixture: ComponentFixture<W2mSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W2mSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(W2mSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
