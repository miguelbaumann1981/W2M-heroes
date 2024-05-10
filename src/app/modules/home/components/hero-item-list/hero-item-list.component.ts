import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { W2mNotificationComponent } from 'src/app/shared/components/w2m-notification/w2m-notification.component';

@Component({
  selector: 'hero-item-list',
  templateUrl: './hero-item-list.component.html',
  styleUrls: ['./hero-item-list.component.scss']
})
export class HeroItemListComponent {

  @Input() public heroItem: HeroItemList;

  @Output() public editHeroEvent: EventEmitter<HeroItemList> = new EventEmitter<HeroItemList>();
  @Output() public deleteHeroEvent: EventEmitter<HeroItemList> = new EventEmitter<HeroItemList>();

  constructor(public dialog: MatDialog) {}

  openDialog(hero: HeroItemList): void {
    this.dialog.open(W2mNotificationComponent, {
      width: '400px'
    });
    this.deleteHeroEvent.emit(hero);
  }


}
