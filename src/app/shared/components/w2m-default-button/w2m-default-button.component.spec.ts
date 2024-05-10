import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W2mDefaultButtonComponent } from './w2m-default-button.component';

describe('W2mDefaultButtonComponent', () => {
  let component: W2mDefaultButtonComponent;
  let fixture: ComponentFixture<W2mDefaultButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W2mDefaultButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(W2mDefaultButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
