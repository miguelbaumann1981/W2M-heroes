import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W2mNotificationComponent } from './w2m-notification.component';

describe('W2mNotificationComponent', () => {
  let component: W2mNotificationComponent;
  let fixture: ComponentFixture<W2mNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W2mNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(W2mNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
