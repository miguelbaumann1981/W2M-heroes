import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W2mInputComponent } from './w2m-input.component';

describe('W2mInputComponent', () => {
  let component: W2mInputComponent;
  let fixture: ComponentFixture<W2mInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W2mInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(W2mInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.placeholder).toBe('Enter a value');
  });
});
