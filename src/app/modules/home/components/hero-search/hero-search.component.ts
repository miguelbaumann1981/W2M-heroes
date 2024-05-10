import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent {

  @Input() public placeholder: string = 'Enter a name';
  @Input() public label: string = 'Search hero';
  @Input() public icon: string = 'search';
  @Input() public value: string = '';

  @Output() public searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public clearEvent: EventEmitter<string> = new EventEmitter<string>();

  public searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      value: ['']
    });
  }

  public onSearchEvent(): void {
    this.searchEvent.emit(this.searchForm.controls['value'].value);
  }

  

}
