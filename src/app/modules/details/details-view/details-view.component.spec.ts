import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DetailsViewComponent } from './details-view.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EditHeroViewComponent } from '@home-module/edit-hero-view/edit-hero-view.component';
import { CreateHeroViewComponent } from '@home-module/create-hero-view/create-hero-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroItemCard } from 'src/app/shared/interfaces/HeroItemCard';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

const routes = [
  {
    path: 'home/hero',
    component: EditHeroViewComponent
  },
  {
    path: 'details',
    component: DetailsViewComponent
  },
  {
    path: 'home/createHero',
    component: CreateHeroViewComponent
  }
];

const heroArray: HeroItemCard[] = [
  {
    id: 1,
    name: 'Batman',
    race: 'bat',
    imgProfile: '',
    alias: 'Juan',
    powers: {
      intelligence: 10,
      strength: 20,
      speed: 30,
      durability: 40,
      power: 50,
      combat: 60
    }
  },
  {
    id: 2,
    name: 'Iron',
    race: 'iron',
    imgProfile: '',
    alias: 'Pedro',
    powers: {
      intelligence: 10,
      strength: 20,
      speed: 30,
      durability: 40,
      power: 50,
      combat: 60
    }
  }
];

describe('DetailsViewComponent', () => {
  let component: DetailsViewComponent;
  let fixture: ComponentFixture<DetailsViewComponent>;
  let service: HeroesService;
  let location: Location;
  let router: Router;
  let httpMock : HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [ 
        DetailsViewComponent
       ],
       schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsViewComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HeroesService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    httpMock = TestBed.inject(HttpTestingController);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('ngOnInit method inits a searchForm', () => {
    component.ngOnInit();
    expect(component.searchForm.invalid).toBeFalse();
  });

  it('onSearch method returns result', () => {
    component.heroesCardsFiltered = [];
    component.heroesCards = heroArray;
    component.onSearch();
    heroArray.map(elem => {
      component.heroesCardsFiltered.push(elem);
      expect(component.results).toBe(2);
    });
  });

  it('onCloseNotification method sets error service as a false', () => {
    component.isErrorService = true;
    component.onCloseNotification();
    expect(component.isErrorService).toBeFalse();
  });

  it('onClear method returns the form as a empty value', () => {
    component.searchForm.controls['value'].setValue('');
    component.onClear();
    expect(component).toBeTruthy();
  });
});
