import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HandleActionsDialogService } from 'src/app/services/handle-actions-dialog.service';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();
  public heroesList: HeroItemList[] = [];
  public heroesListFiltered: HeroItemList[] = [];
  public selectedHero: HeroItemList;
  public results: number;
  public heroStored: HeroItemList;
  public isSpinnerEnabled: boolean = false;

  constructor( 
    private heroesService: HeroesService,
    private handleActionsDialog: HandleActionsDialogService
   ) {}

  ngOnInit(): void {
    this.getAllHeroesFromService();
  }

  private getAllHeroesFromService(): void {
    this.isSpinnerEnabled = true;
    this.heroesService.getAllHeroes().pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        console.log(response);
        this.heroesList = response.map((item: any) => {
          return {
            id: item?.id,
            name: item?.name,
            race: item?.appearance?.race,
            img: item?.images?.xs
          }
        });
        this.results = this.heroesList.length;
  
        if (this.heroesListFiltered.length === 0) {
          this.heroesListFiltered = this.heroesList;
          this.results = this.heroesListFiltered.length;
        }
      
      },
      error: () => {},
      complete: () => {
        this.isSpinnerEnabled = false;
      }
    })
      
  }

  public onSearch(value: string): void {
    console.log(value);
    this.heroesListFiltered = [];
    if (value === '' || value === undefined) {
      this.getAllHeroesFromService();
    } 
    
    this.heroesList.map(item => {
      if ((item.name).includes(value)) {
        this.heroesListFiltered.push(item);
        this.results = this.heroesListFiltered.length;
      }
    });
  }

  public onClear(value: string): void {
    this.onSearch(value);
  }

  public onEditHero(hero: HeroItemList): void {

  }

  public removeHeroById(arr, id): void {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);
    return arr;
  }

  public onDeleteHero(hero: HeroItemList): void {
    console.log(hero);
    this.removeHeroById(this.heroesListFiltered, hero?.id);
    this.results = this.heroesListFiltered.length;
  }

  public createHero(): void {

  }

  ngOnDestroy() {
    this.destroy$.next(undefined);
  }

}
