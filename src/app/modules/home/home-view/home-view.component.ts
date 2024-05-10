import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HandleActionsDialogService } from 'src/app/services/handle-actions-dialog.service';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  private readonly destroy$ = new Subject<void>();
  public heroesList: HeroItemList[] = [];
  public heroesListFiltered: HeroItemList[] = [];
  public selectedHero: HeroItemList;
  public results: number;

  constructor( 
    private heroesService: HeroesService,
    private handleActionsDialog: HandleActionsDialogService
   ) {}

  ngOnInit(): void {
    this.getAllHeroesFromService();

    this.handleActionsDialog.confirmDialog$.subscribe(status => {
      if (status) {
        
      }
    });
  }

  private getAllHeroesFromService(): void {
    this.heroesService.getAllHeroes().pipe(takeUntil(this.destroy$))
    .subscribe(response => {
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
      }
    });
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

  public removeObjectWithId(arr, id): void {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);
    return arr;
  }

  public onDeleteHero(hero: HeroItemList): void {
    console.log(hero);
    this.removeObjectWithId(this.heroesListFiltered, hero.id);
    this.results = this.heroesListFiltered.length;
  }

}
