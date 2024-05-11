import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeroItemList } from '../shared/interfaces/HeroItemList';

// const heroDefault: HeroItemList = {
//   id: 0,
//   name: '',
//   race: '',
//   img: ''
// };

@Injectable({
  providedIn: 'root'
})
export class HandleActionsDialogService {

  public closeDialog$ = new BehaviorSubject<boolean>(false);
  public confirmDialog$ = new BehaviorSubject<boolean>(false);
  public heroStored$ = new BehaviorSubject<HeroItemList>(undefined);
  public heroesListStored$ = new BehaviorSubject<HeroItemList[]>([]);

  constructor() { }

  getHeroStored(): Observable<HeroItemList> {
    return this.heroStored$.asObservable();
  }

  setHeroStored(item: HeroItemList): void {
    this.heroStored$.next(item);
  }

  getHeroesListStored(): Observable<HeroItemList[]> {
    return this.heroesListStored$.asObservable();
  }

  setHeroesListStored(list: HeroItemList[]): void {
    this.heroesListStored$.next(list);
  }


}
