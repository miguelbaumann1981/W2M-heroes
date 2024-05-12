import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type Status = 'success' | 'error' | 'info';

@Component({
  selector: 'w2m-notification',
  templateUrl: './w2m-notification.component.html',
  styleUrls: ['./w2m-notification.component.scss']
})
export class W2mNotificationComponent implements OnInit {

  @Input() public notificationText: string = 'Notification';
  @Input() public type: Status = 'info';
  @Input() public isCloseButton: boolean = false;

  @Output() public closeEvent: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
    if (!this.isCloseButton) {
      this.closeEvent.emit();
    }
  }

  /*
  * Method to set the styles by type
  */
  public setColorNotification(type: string): string {
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
