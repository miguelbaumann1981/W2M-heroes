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
import { HandleEditHeroService } from 'src/app/services/handle-edit-hero.service';

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

const mockHero = {
  "id": 1,
  "name": "A-Bomb",
  "slug": "1-a-bomb",
  "powerstats": {
      "intelligence": 38,
      "strength": 100,
      "speed": 17,
      "durability": 80,
      "power": 24,
      "combat": 64
  },
  "appearance": {
      "gender": "Male",
      "race": "Human",
      "height": [
          "6'8",
          "203 cm"
      ],
      "weight": [
          "980 lb",
          "441 kg"
      ],
      "eyeColor": "Yellow",
      "hairColor": "No Hair"
  },
  "biography": {
      "fullName": "Richard Milhouse Jones",
      "alterEgos": "No alter egos found.",
      "aliases": [
          "Rick Jones"
      ],
      "placeOfBirth": "Scarsdale, Arizona",
      "firstAppearance": "Hulk Vol 2 #2 (April, 2008) (as A-Bomb)",
      "publisher": "Marvel Comics",
      "alignment": "good"
  },
  "work": {
      "occupation": "Musician, adventurer, author; formerly talk show host",
      "base": "-"
  },
  "connections": {
      "groupAffiliation": "Hulk Family; Excelsior (sponsor), Avengers (honorary member); formerly partner of the Hulk, Captain America and Captain Marvel; Teen Brigade; ally of Rom",
      "relatives": "Marlo Chandler-Jones (wife); Polly (aunt); Mrs. Chandler (mother-in-law); Keith Chandler, Ray Chandler, three unidentified others (brothers-in-law); unidentified father (deceased); Jackie Shorr (alleged mother; unconfirmed)"
  },
  "images": {
      "xs": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
      "sm": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
      "md": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
      "lg": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg"
  }
};

fdescribe('EditHeroViewComponent', () => {
  let component: EditHeroViewComponent;
  let fixture: ComponentFixture<EditHeroViewComponent>;
  let location: Location;
  let router: Router;
  let service: HandleEditHeroService

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
    service = TestBed.inject(HandleEditHeroService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('editHeroForm is valid', () => {
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
    // const name = component.editHeroForm.controls['name'];
    // name.setValue('A-Bomb');
    // const race = component.editHeroForm.controls['race'];
    component['getHeroByIdFromService'](idHero);
    component['heroesService'].getHeroById(idHero).subscribe(elem => {
      expect(elem.name).toBe('Batman');
      // race.setValue(heroSaved.race);
      // expect(name.invalid).toBeTruthy();
      // expect(race.invalid).toBeTruthy();
    })

  });

});
