import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'w2m-input',
  templateUrl: './w2m-input.component.html',
  styleUrls: ['./w2m-input.component.scss']
})
export class W2mInputComponent {

  @Input() public placeholder: string = 'Enter a value';
  @Input() public label: string = 'Input';
  @Input() public control: FormControl | any;
  @Input() public value: string = '';

  constructor() {}
}
