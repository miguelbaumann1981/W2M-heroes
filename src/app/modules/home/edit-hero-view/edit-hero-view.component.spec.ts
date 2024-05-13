import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EditHeroViewComponent } from './edit-hero-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeViewComponent } from '@home-module/home-view/home-view.component';
import { Location } from "@angular/common";
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';
import { HeroesService } from 'src/app/services/heroes.service';
import { HttpClientModule } from '@angular/common/http';

const routes = [
  {
    path: 'home',
    component: HomeViewComponent
  }
];

const heroSaved: HeroItemList = {
  id: 1,
  name: 'Batman',
  race: 'bat',
  img: ''
};

describe('EditHeroViewComponent', () => {
  let component: EditHeroViewComponent;
  let fixture: ComponentFixture<EditHeroViewComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule
      ],
      declarations: [ 
        EditHeroViewComponent 
      ],
      providers: [
        HeroesService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHeroViewComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('editHeroForm is valid', () => {
    component.ngOnInit();
    expect(component.editHeroForm.valid).toBeFalsy();
  });

  it('generateHeroId method creates a random value', () => {
    const min: number = 20;
    const max: number = 50;
    const result = component.generateHeroId(min, max);
    expect(result).toBeGreaterThan(19);
  });


  it('saveHero method navigates to Home', fakeAsync(() => {
    const url: string = 'home';
    router.navigate([url]);
    component.saveHero();
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('return method navigates to Home', fakeAsync(() => {
    const url: string = 'home';
    router.navigate([url]);
    component.return();
    tick();
    expect(location.path()).toBe('/home');
  }));

  it('saveHero method sets a saved hero', () => {
    component['handleEditHeroService'].setHeroEdited(heroSaved);
    component.saveHero();
    expect(component).toBeTruthy();
  });

  it('getHeroByIdFromService method subscribes a service', () => {
    const idHero: string = heroSaved.id.toString();
    component['getHeroByIdFromService'](idHero);
    component['heroesService'].getHeroById(idHero).subscribe(elem => {
      expect(elem.name).toBe('A-Bomb');
    });
  });

});
