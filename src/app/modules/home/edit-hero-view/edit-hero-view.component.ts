import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HandleEditHeroService } from 'src/app/services/handle-edit-hero.service';
import { HeroesService } from 'src/app/services/heroes.service';
import { RoutePaths } from 'src/app/shared/enums/Routes';
import { Hero } from 'src/app/shared/interfaces/Hero';
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';

@Component({
  selector: 'app-edit-hero-view',
  templateUrl: './edit-hero-view.component.html',
  styleUrls: ['./edit-hero-view.component.scss']
})
export class EditHeroViewComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();
  public editHeroForm: FormGroup;
  public editedHero: HeroItemList;


  constructor( 
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private handleEditHeroService: HandleEditHeroService
  ) {}

  ngOnInit(): void {
    this.editHeroForm = this.formBuilder.group({
      name: ['', Validators.required],
      race: ['', Validators.required]
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.getHeroByIdFromService(params['id']);
    });
  }

  /**
   * Method to get all heroes from API
   * @param newHero 
   * @param removeHero 
   */
  private getHeroByIdFromService(id: string): void {
    this.heroesService.getHeroById(id).pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: Hero) => {
        this.editedHero = {
          id: response?.id,
          name: response?.name,
          race: response?.appearance?.race,
          img: response?.images?.xs
        };
        this.editHeroForm.controls['name'].setValue(this.editedHero.name);
        this.editHeroForm.controls['race'].setValue(this.editedHero.race);
      }
    });
  }

  /**
   * Method to generate a random Id to edited heroes
   * @param min 
   * @param max 
   */
  public generateHeroId(min: number, max: number): number {  
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Method to save hero and change in the previuos list
   */
  public saveHero(): void {
    const heroSaved: HeroItemList = {
      id: this.generateHeroId(1000, 10000),
      name: this.editHeroForm.controls['name'].value,
      race: this.editHeroForm.controls['race'].value,
      img: this.editedHero?.img
    };

    this.handleEditHeroService.setHeroEdited(heroSaved);
    this.router.navigate([RoutePaths.HOME]);
  }

  /**
   * Method to return to the previuos view
   */
  public return(): void {
    this.router.navigate([RoutePaths.HOME]);
  }

  ngOnDestroy() {
    this.destroy$.next(undefined);
  }

}
