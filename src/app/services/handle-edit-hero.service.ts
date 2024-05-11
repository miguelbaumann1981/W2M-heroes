import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeroItemList } from '../shared/interfaces/HeroItemList';

@Injectable({
    providedIn: 'root'
})
export class HandleEditHeroService {

    public heroEdited$ = new BehaviorSubject<HeroItemList>(undefined);
    public heroRemoved$ = new BehaviorSubject<HeroItemList>(undefined);

    constructor() { }

    getHeroEdited(): Observable<HeroItemList> {
      return this.heroEdited$.asObservable();
    }
  
    setHeroEdited(item: HeroItemList): void {
      this.heroEdited$.next(item);
    }

    getHeroRemoved(): Observable<HeroItemList> {
        return this.heroRemoved$.asObservable();
      }
    
    setHeroRemoved(item: HeroItemList): void {
      this.heroRemoved$.next(item);
    }
}