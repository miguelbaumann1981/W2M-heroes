import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CreateHeroViewComponent } from './create-hero-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeViewComponent } from '@home-module/home-view/home-view.component';
import { Location } from "@angular/common";
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';

const routes = [
  {
    path: 'home',
    component: HomeViewComponent
  }
];

describe('CreateHeroViewComponent', () => {
  let component: CreateHeroViewComponent;
  let fixture: ComponentFixture<CreateHeroViewComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes)
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
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
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

  it('return method navigates to Home', fakeAsync(() => {
    const url: string = 'home';
    router.navigate([url]);
    component.return();
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('saveHero method navigates to Home', fakeAsync(() => {
    const url: string = 'home';
    router.navigate([url]);
    component.saveHero();
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('saveHero method sets a saved hero', () => {
    const heroSaved: HeroItemList = {
      id: 1,
      name: 'Hero name',
      race: 'Hero race',
      img: ''
    };
    component['handleEditHeroService'].setHeroEdited(heroSaved);
    component.saveHero();
    expect(component).toBeTruthy();
  });

});
