import { TestBed } from "@angular/core/testing";
import { HandleEditHeroService } from "./handle-edit-hero.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroItemList } from "../shared/interfaces/HeroItemList";

const hero: HeroItemList = {
    id: 1,
    name: 'Batman',
    race: 'bat',
    img: ''
  };

describe('HandleEditHeroService', () => {
    let service: HandleEditHeroService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                HandleEditHeroService
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA, 
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();

        service = TestBed.inject(HandleEditHeroService);
    });

    it('setHeroEdited stores a hero', () => {
        const spy = spyOn(service.heroEdited$, 'next');
        service.setHeroEdited(hero);
        expect(spy).toHaveBeenCalledOnceWith(hero);
    });

    it('getHeroEdited returns a hero', () => {
        service.setHeroEdited(hero);
        service.getHeroEdited().subscribe(response => 
            expect(response.name).toBe('Batman')
        );
    });

    it('setHeroRemoved stores a hero', () => {
        const spy = spyOn(service.heroRemoved$, 'next');
        service.setHeroRemoved(hero);
        expect(spy).toHaveBeenCalledOnceWith(hero);
    });

    it('getHeroRemoved returns a hero', () => {
        service.setHeroRemoved(hero);
        service.getHeroRemoved().subscribe(response => 
            expect(response.name).toBe('Batman')
        );
    });
});