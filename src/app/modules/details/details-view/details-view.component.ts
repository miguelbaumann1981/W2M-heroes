import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroItemCard } from 'src/app/shared/interfaces/HeroItemCard';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();
  public heroesCards: HeroItemCard[] = [];
  public heroesCardsFiltered: HeroItemCard[] = [];
  public selectedHero: HeroItemCard;
  public results: number;
  public isSpinnerEnabled: boolean = false;
  public isErrorService: boolean = false;
  public searchForm: FormGroup;

  constructor( 
    private heroesService: HeroesService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllHeroesFromService();

    this.searchForm = this.formBuilder.group({
      value: ['']
    });
  }

  private getAllHeroesFromService(): void {
    this.isSpinnerEnabled = true;
    this.heroesService.getAllHeroes().pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        console.log(response);
        this.heroesCards = response.map((item: any) => {
          return {
            id: item?.id,
            name: item?.name,
            race: item?.appearance?.race ? item?.appearance?.race : 'No race',
            imgProfile: item?.images?.xs,
            imgLarge: item?.images?.lg,
            alias: item?.biography?.fullName ? item?.biography?.fullName : 'No alias',
            powers: {
              intelligence: item?.powerstats?.intelligence,
              strength: item?.powerstats?.strength,
              speed: item?.powerstats?.speed,
              durability: item?.powerstats?.durability,
              power: item?.powerstats?.power,
              combat: item?.powerstats?.combat,
            }
          }
        });
        this.results = this.heroesCards.length;
        console.log(this.heroesCards);

        if (this.heroesCardsFiltered.length === 0) {
          this.heroesCardsFiltered = this.heroesCards;
          this.heroesCardsFiltered.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.results = this.heroesCardsFiltered.length;
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

  public onSearch(): void {
    this.heroesCardsFiltered = [];
    if (this.searchForm.controls['value'].value === '' || this.searchForm.controls['value'].value === undefined) {
      this.getAllHeroesFromService();
    } 
    
    this.heroesCards.map(item => {
      if ((item.name).includes(this.searchForm.controls['value'].value)) {
        this.heroesCardsFiltered.push(item);
        this.results = this.heroesCardsFiltered.length;
      }
    });
  }

  public onClear(): void {
    this.searchForm.reset();
    this.searchForm.controls['value'].setValue('');
    this.onSearch();
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
