import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeViewComponent } from './home-view.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';
import { HeroesService } from 'src/app/services/heroes.service';
import { Hero } from 'src/app/shared/interfaces/Hero';
import { EditHeroViewComponent } from '@home-module/edit-hero-view/edit-hero-view.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from "@angular/common";
import { DetailsViewComponent } from '@details-module/details-view/details-view.component';
import { CreateHeroViewComponent } from '@home-module/create-hero-view/create-hero-view.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const hero: HeroItemList = {
  id: 1,
  name: 'Batman',
  race: 'bat',
  img: ''
};
const heroArray: HeroItemList[] = [
  {
    id: 1,
    name: 'Batman',
    race: 'bat',
    img: ''
  },
  {
    id: 2,
    name: 'Iron',
    race: 'iron',
    img: ''
  }
];

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

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;
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
        HomeViewComponent 
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
    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HeroesService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    httpMock = TestBed.inject(HttpTestingController);
    router.initialNavigation();
    fixture.detectChanges();
  });


  it('onEditHero method navigates to Edit view', fakeAsync(() => {
    const url: string = 'home/hero';
    router.navigate([url]);
    component.onEditHero(hero);
    tick();
    expect(location.path()).toBe('/home/hero?id=1');
  }));

  it('createHero method navigates to Create Hero view', fakeAsync(() => {
    const url: string = 'home/createHero';
    router.navigate([url]);
    component.createHero();
    tick();
    expect(location.path()).toBe('/home/createHero');
  }));

  it('seeDetailHero method navigates to Details view', fakeAsync(() => {
    const url: string = 'details';
    router.navigate([url]);
    component.seeDetailHero(hero);
    tick();
    expect(location.path()).toBe('/details?id=1');
  }));
  

  it('hideNotification method sets notification as a false', fakeAsync(() => {
    component.isNotificationShown = true;
    component.hideNotification();
    tick(3000);
    expect(component.isNotificationShown).toBeFalse();
  }));

  it('onCloseNotification method sets error service as a false', () => {
    component.isErrorService = true;
    component.onCloseNotification();
    expect(component.isErrorService).toBeFalse();
  });


  it('onDeleteHero method sets the result', () => {
    component.heroesListFiltered = heroArray;
    component.onDeleteHero(hero);
    component.removeHeroById(heroArray, hero.id);
    expect(component.results).toBe(1);
    expect(component.notificationText).toBe('The hero has been deleted successfully');
  });

  it('onEditHero method sets a remove hero', () => {
    const heroToRemove: HeroItemList = {
      id: 1,
      name: 'Hero name',
      race: 'Hero race',
      img: ''
    };
    component['handleEditHeroService'].setHeroRemoved(heroToRemove);
    component.onEditHero(heroToRemove);
    expect(component).toBeTruthy();
  });

  it('onSearch method returns result', () => {
    component.heroesListFiltered = [];
    component.heroesList = heroArray;
    component.onSearch('Batman');
    heroArray.map(elem => {
      component.heroesListFiltered.push(elem);
      expect(component.results).toBe(1);
    })
  });

});
