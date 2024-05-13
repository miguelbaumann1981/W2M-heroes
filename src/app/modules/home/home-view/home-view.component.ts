import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HandleEditHeroService } from 'src/app/services/handle-edit-hero.service';
import { HeroesService } from 'src/app/services/heroes.service';
import { RoutePaths } from 'src/app/shared/enums/Routes';
import { Hero } from 'src/app/shared/interfaces/Hero';
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
  public results: number;
  public isSpinnerEnabled: boolean = false;
  public isErrorService: boolean = false;
  public isNotificationShown: boolean = false;
  public notificationText: string = '';

  constructor( 
    private heroesService: HeroesService,
    private handleEditHeroService: HandleEditHeroService,
    private router: Router
   ) {}

  ngOnInit(): void {
    this.getAllHeroesFromService();
    this.handleEditionHero();
  }

  /**
   * Method to evaluate if hero has been edited
   */
  private handleEditionHero(): void {
    this.isNotificationShown = false;
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

  /**
   * Method to get all heroes from API
   * @param newHero 
   * @param removeHero 
   */
  private getAllHeroesFromService(newHero?: HeroItemList, removeHero?: HeroItemList): void {
    this.isSpinnerEnabled = true;
    this.isNotificationShown = false;
    this.heroesService.getAllHeroes().pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: Hero[]) => {
        this.heroesList = response.map((item: Hero) => {
          return {
            id: item?.id,
            name: item?.name,
            race: item?.appearance?.race,
            img: item?.images?.xs
          }
        });
        this.results = this.heroesList.length;

        if (newHero && !removeHero) {
          this.isNotificationShown = true;
          this.notificationText = 'New hero has been created successfully';
          this.heroesList.unshift(newHero);
          this.heroesListFiltered = this.heroesList;
          this.heroesListFiltered.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.results = this.heroesListFiltered.length;
        }
  
        if (newHero && removeHero) {
          this.isNotificationShown = true;
          this.notificationText = 'The hero has been edited successfully';
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

  /**
   * Method to do a search over the form
   * @param value 
   */
  public onSearch(value: string): void {
    this.heroesListFiltered = [];
    if (value === '' || value === undefined) {
      this.getAllHeroesFromService();
    } 
    
    this.heroesList.map(item => {
      if ((item.name.toLowerCase()).includes(value.toLowerCase())) {
        this.heroesListFiltered.push(item);
        this.results = this.heroesListFiltered.length;
      }
    });
  }

  /**
   * Method to clear the form search
   * @param value 
   */
  public onClear(value: string): void {
    this.onSearch(value);
  }

  /**
   * Method to navigate to edition view
   * @param hero 
   */
  public onEditHero(hero: HeroItemList): void {
    this.handleEditHeroService.setHeroRemoved(hero);
    this.router.navigate([RoutePaths.HOME + '/hero'], 
      {
        queryParams: { id: hero?.id }
      }
    );
  }

  /**
   * Method to navigate to detail view
   * @param hero 
   */
  public seeDetailHero(hero: HeroItemList): void {
    this.router.navigate([RoutePaths.DETAILS], 
      {
        queryParams: { id: hero?.id }
      }
    );
  }

  /**
   * Method to remove a hero by Id
   * @param arrayHeroes 
   * @param idHero 
   */
  public removeHeroById(arrayHeroes, idHero: number): void {
    const index = arrayHeroes.findIndex((obj) => obj.id === idHero);
    arrayHeroes.splice(index, 1);
    return arrayHeroes;
  }

  /**
   * Method to delete a hero from array
   * @param hero 
   */
  public onDeleteHero(hero: HeroItemList): void {
    this.removeHeroById(this.heroesListFiltered, hero?.id);
    this.results = this.heroesListFiltered.length;
    this.isNotificationShown = true;
    this.notificationText = 'The hero has been deleted successfully';
  }

  /**
   * Method to navigate to creation hero view
   */
  public createHero(): void {
    this.router.navigate([RoutePaths.HOME + '/createHero']);
  }

  /**
   * Method to close the notification component
   */
  public onCloseNotification(): void {
    if (this.isErrorService) {
      this.isErrorService = false;
    }
    this.getAllHeroesFromService();
  }

  /**
   * Method to hide the notification component
   */
  public hideNotification(): void {
    this.isNotificationShown = true;
    setTimeout(() => {
      this.isNotificationShown = false;
    }, 3000);
  }

  ngOnDestroy() {
    this.destroy$.next(undefined);
  }

}
