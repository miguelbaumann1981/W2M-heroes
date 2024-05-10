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

  constructor() {}


}
