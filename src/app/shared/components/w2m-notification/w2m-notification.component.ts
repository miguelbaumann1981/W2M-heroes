import { Component, EventEmitter, Input, Output } from '@angular/core';

type Status = 'success' | 'error' | 'info';

@Component({
  selector: 'w2m-notification',
  templateUrl: './w2m-notification.component.html',
  styleUrls: ['./w2m-notification.component.scss']
})
export class W2mNotificationComponent {

  @Input() public notificationText: string = 'Notification';
  @Input() public type: Status = 'info';

  @Output() public closeEvent: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }



  public setColorNotifiction(type: string): string {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }

}
