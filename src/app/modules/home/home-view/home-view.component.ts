import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HandleEditHeroService } from 'src/app/services/handle-edit-hero.service';
import { HeroesService } from 'src/app/services/heroes.service';
import { RoutePaths } from 'src/app/shared/enums/Routes';
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
  public isErrorService: boolean = false;

  constructor( 
    private heroesService: HeroesService,
    private handleEditHeroService: HandleEditHeroService,
    private router: Router
   ) {}

  ngOnInit(): void {
    this.getAllHeroesFromService();

    this.handleEditHeroService.getHeroEdited().subscribe((hero: HeroItemList) => {
      if (hero !== undefined) {
        this.handleEditHeroService.getHeroRemoved().subscribe((removed: HeroItemList) => {
          if (removed !== undefined) {
            this.getAllHeroesFromService(hero, removed);
          } else {
            this.getAllHeroesFromService(hero);
          }
        });
      }
    });
  }

  private getAllHeroesFromService(newHero?: HeroItemList, removeHero?: HeroItemList): void {
    this.isSpinnerEnabled = true;
    this.heroesService.getAllHeroes().pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.heroesList = response.map((item: any) => {
          return {
            id: item?.id,
            name: item?.name,
            race: item?.appearance?.race,
            img: item?.images?.xs
          }
        });
        this.results = this.heroesList.length;

        if (newHero && !removeHero) {
          this.heroesList.unshift(newHero);
          this.heroesListFiltered = this.heroesList;
          this.heroesListFiltered.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.results = this.heroesListFiltered.length;
        }
  
        if (newHero && removeHero) {
          this.heroesList.unshift(newHero);
          this.removeHeroById(this.heroesList, removeHero?.id);
          this.heroesListFiltered = this.heroesList;
          this.heroesListFiltered.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.results = this.heroesListFiltered.length;
        }

        if (this.heroesListFiltered.length === 0) {
          this.heroesListFiltered = this.heroesList;
          this.heroesListFiltered.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.results = this.heroesListFiltered.length;
        }
      
      },
      error: () => {
        this.isErrorService = true;
      },
      complete: () => {
        this.isSpinnerEnabled = false;
        setTimeout(() => {
          this.isErrorService = false;
        }, 3000);
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
    this.handleEditHeroService.setHeroRemoved(hero);
    this.router.navigate([RoutePaths.HOME + '/hero'], 
      {
        queryParams: 
          { id: hero?.id }
      }
    );
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
    this.router.navigate([RoutePaths.HOME + '/createHero']);
  }

  public onCloseNotification(): void {
    if (this.isErrorService) {
      this.isErrorService = false;
    }
    this.getAllHeroesFromService();
  }

  ngOnDestroy() {
    this.destroy$.next(undefined);
  }

}
