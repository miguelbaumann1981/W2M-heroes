import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroSearchComponent } from './hero-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [ 
        HeroSearchComponent 
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('searchForm is valid', () => {
    expect(component.searchForm.valid).toBeTruthy();
  });

  it('onSearchEvent method emits and event', () => {
    const value = 'Batman';
    component.searchForm.controls['value'].setValue(value);
    const spy = spyOn(component.searchEvent, 'emit');
    component.onSearchEvent();
    expect(spy).toHaveBeenCalledWith('Batman');
  });

  it('onClear method emits and event', () => {
    const value = '';
    const spy = spyOn(component.clearEvent, 'emit');
    component.onClear();
    expect(spy).toHaveBeenCalledWith(value);
  });

  it('onClear method resets the form', () => {
    component.onClear();
    component.searchForm.reset();
    expect(component).toBeTruthy();
  });

});
