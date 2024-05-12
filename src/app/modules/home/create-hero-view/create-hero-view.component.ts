import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HandleEditHeroService } from 'src/app/services/handle-edit-hero.service';
import { RoutePaths } from 'src/app/shared/enums/Routes';
import { HeroItemList } from 'src/app/shared/interfaces/HeroItemList';

@Component({
  selector: 'app-create-hero-view',
  templateUrl: './create-hero-view.component.html',
  styleUrls: ['./create-hero-view.component.scss']
})
export class CreateHeroViewComponent implements OnInit {

  public createHeroForm: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private handleEditHeroService: HandleEditHeroService
  ) {}

  ngOnInit(): void {
    this.createHeroForm = this.formBuilder.group({
      name: ['', Validators.required],
      race: ['', Validators.required]
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
   * Method to save hero and add in the previuos list
   */
  public saveHero(): void {
    const heroSaved: HeroItemList = {
      id: this.generateHeroId(1000, 10000),
      name: this.createHeroForm.controls['name'].value,
      race: this.createHeroForm.controls['race'].value,
      img: 'assets/img/new-hero.png'
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

}
