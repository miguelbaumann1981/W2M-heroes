import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';

@Component({
  selector: 'hero-item-list',
  templateUrl: './hero-item-list.component.html',
  styleUrls: ['./hero-item-list.component.scss']
})
export class HeroItemListComponent {

  @Input() public heroItem: HeroItemList;

  @Output() public editHeroEvent: EventEmitter<HeroItemList> = new EventEmitter<HeroItemList>();
  @Output() public deleteHeroEvent: EventEmitter<HeroItemList> = new EventEmitter<HeroItemList>();
  @Output() public seeDetailHeroEvent: EventEmitter<HeroItemList> = new EventEmitter<HeroItemList>();

  public isDeleteConfirmEnabled: boolean = false;

  constructor() {}

  /**
   * Method to show section delete confirmation
   */
  public showConfirmation(): void {
    this.isDeleteConfirmEnabled = true;
  }

  /**
   * Method to emit confimation event
   */
  public confirm(): void {
    this.deleteHeroEvent.emit(this.heroItem);
  }

  /**
   * Method to hide section delete confirmation
   */
  public cancel(): void {
    this.isDeleteConfirmEnabled = false;
  }


}
