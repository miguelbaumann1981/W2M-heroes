import { ComponentFixture, TestBed } from '@angular/core/testing';
import { W2mNotificationComponent } from './w2m-notification.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('W2mNotificationComponent', () => {
  let component: W2mNotificationComponent;
  let fixture: ComponentFixture<W2mNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        W2mNotificationComponent
       ],
       schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W2mNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('notificationText is not a null variable', () => {
    expect(component.notificationText).not.toBeNull();
  });

  it('ngOnInit inits when button is false', () => {
    component.isCloseButton = false;
    component.ngOnInit();
    expect(component.closeEvent).toBeTruthy();
  });

  it('setColorNotifiction returns success with type', () => {
    const type = 'success';
    const method = component.setColorNotification(type);
    expect(method).toBe('success');
  });

  it('setColorNotifiction returns error with type', () => {
    const type = 'error';
    const method = component.setColorNotification(type);
    expect(method).toBe('error');
  });

  it('setColorNotifiction returns info with type', () => {
    const type = 'info';
    const method = component.setColorNotification(type);
    expect(method).toBe('info');
  });
});
