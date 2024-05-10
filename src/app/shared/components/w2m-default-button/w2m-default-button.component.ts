import { Component, Input } from '@angular/core';

type Mode = 'primary' | 'accent' | 'warn';

@Component({
  selector: 'w2m-default-button',
  templateUrl: './w2m-default-button.component.html',
  styleUrls: ['./w2m-default-button.component.scss']
})
export class W2mDefaultButtonComponent {

  @Input() public text: string = '';
  @Input() public mode: Mode = 'primary';

}
