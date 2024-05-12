import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroItemListComponent } from './hero-item-list.component';
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';

describe('HeroItemListComponent', () => {
  let component: HeroItemListComponent;
  let fixture: ComponentFixture<HeroItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        HeroItemListComponent 
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('heroItem is defined by interface', () => {
    const hero: HeroItemList = {
      id: 1,
      name: 'Batman',
      race: 'bat',
      img: ''
    };
    component.heroItem = hero;
    expect(component.heroItem).toBeTruthy();
  });

  it('showConfirmation method works', () => {
    component.showConfirmation();
    expect(component.isDeleteConfirmEnabled).toBeTrue();
  });

  it('cancel method works', () => {
    component.cancel();
    expect(component.isDeleteConfirmEnabled).toBeFalse();
  });

  it('confirm method works', () => {
    const hero: HeroItemList = {
      id: 1,
      name: 'Batman',
      race: 'bat',
      img: ''
    };
    component.heroItem = hero;
    const spy = spyOn(component.deleteHeroEvent, 'emit');
    component.confirm();
    expect(spy).toHaveBeenCalledWith(hero);
  });
});
