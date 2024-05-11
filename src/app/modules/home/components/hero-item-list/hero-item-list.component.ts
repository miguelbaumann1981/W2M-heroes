import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { W2mDialogComponent } from 'src/app/shared/components/w2m-dialog/w2m-dialog.component';
import { HandleActionsDialogService } from 'src/app/services/handle-actions-dialog.service';

@Component({
  selector: 'hero-item-list',
  templateUrl: './hero-item-list.component.html',
  styleUrls: ['./hero-item-list.component.scss']
})
export class HeroItemListComponent {

  @Input() public heroItem: HeroItemList;
  @Input() public isHeroDeleted: boolean = false;

  @Output() public editHeroEvent: EventEmitter<HeroItemList> = new EventEmitter<HeroItemList>();
  @Output() public deleteHeroEvent: EventEmitter<HeroItemList> = new EventEmitter<HeroItemList>();

  public isDeleteConfirmEnabled: boolean = false;

  constructor(
    public dialog: MatDialog,
    private handleActionsDialog: HandleActionsDialogService
  ) {}

  openDialog(hero: HeroItemList): void {
    this.dialog.open(W2mDialogComponent, {
      width: '400px'
    });
    this.handleActionsDialog.setHeroStored(hero);
  }

  public showConfirmation(): void {
    this.isDeleteConfirmEnabled = true;
  }

  public confirm(): void {
    this.deleteHeroEvent.emit(this.heroItem);
  }

  public cancel(): void {
    this.isDeleteConfirmEnabled = false;
  }


}
