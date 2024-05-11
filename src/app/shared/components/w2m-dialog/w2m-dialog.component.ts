import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HandleActionsDialogService } from 'src/app/services/handle-actions-dialog.service';
import { HeroItemList } from '../../interfaces/HeroItemList';

@Component({
  selector: 'app-w2m-dialog',
  templateUrl: './w2m-dialog.component.html',
  styleUrls: ['./w2m-dialog.component.scss']
})
export class W2mDialogComponent implements OnInit {

  @Input() public dialogText: string = 'Do you want to remove to ';

  public heroStored: HeroItemList;

  constructor(
    public dialogRef: MatDialogRef<W2mDialogComponent>, 
    private handleActionsDialog: HandleActionsDialogService
  ) { }

  ngOnInit(): void {
    this.handleActionsDialog.getHeroStored().subscribe(resp => {
      this.heroStored = resp;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
    // this.handleActionsDialog.confirmDialog$.next(false);
  }

  public confirmAction(hero: HeroItemList): void {
    this.handleActionsDialog.confirmDialog$.next(true);
    this.handleActionsDialog.setHeroStored(hero);
    this.closeDialog();
  }

}
