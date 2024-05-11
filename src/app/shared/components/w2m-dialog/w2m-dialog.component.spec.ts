import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W2mDialogComponent } from './w2m-dialog.component';

describe('W2mDialogComponent', () => {
  let component: W2mDialogComponent;
  let fixture: ComponentFixture<W2mDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W2mDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(W2mDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
