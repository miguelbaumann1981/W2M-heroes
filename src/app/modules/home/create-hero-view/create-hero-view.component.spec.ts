import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CreateHeroViewComponent } from './create-hero-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

fdescribe('CreateHeroViewComponent', () => {
  let component: CreateHeroViewComponent;
  let fixture: ComponentFixture<CreateHeroViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ 
        CreateHeroViewComponent 
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('createHeroForm is valid', () => {
    expect(component.createHeroForm.valid).toBeFalsy();
  });

  it('name field validity', () => {
    let name = component.createHeroForm.controls['name'];
    expect(name.valid).toBeFalsy();
  });

  it('race field sets a value', () => {
    let race = component.createHeroForm.controls['race'];
    race.setValue('Human');
    expect(race.value).toEqual('Human');
  });

  it('race field is required', () => {
    let race = component.createHeroForm.controls['race'];
    race.setValue('');
    expect(race.invalid).toBeTruthy();
  });


  it('generateHeroId method creates a random value', () => {
    const min: number = 20;
    const max: number = 50;
    const result = component.generateHeroId(min, max);
    expect(result).toBeGreaterThan(19);
  });
});
