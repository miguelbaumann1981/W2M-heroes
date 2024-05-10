import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HandleActionsDialogService } from 'src/app/services/handle-actions-dialog.service';

@Component({
  selector: 'w2m-notification',
  templateUrl: './w2m-notification.component.html',
  styleUrls: ['./w2m-notification.component.scss']
})
export class W2mNotificationComponent {

  @Input() public notificationText: string = 'Are you sure?';


  constructor(
    public dialogRef: MatDialogRef<W2mNotificationComponent>, 
    private handleActionsDialog: HandleActionsDialogService
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  public confirmAction() {
    this.handleActionsDialog.confirmDialog$.next(true);
    this.closeDialog();
  }

}
