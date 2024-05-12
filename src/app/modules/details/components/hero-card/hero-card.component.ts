import { Component, Input } from '@angular/core';
import { HeroItemCard } from 'src/app/shared/interfaces/HeroItemCard';


@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {

  @Input() public heroCard: HeroItemCard;

  constructor() {}

}
