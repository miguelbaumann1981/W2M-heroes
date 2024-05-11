import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroItemListComponent } from './components/hero-item-list/hero-item-list.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { CreateHeroViewComponent } from './create-hero-view/create-hero-view.component';
import { EditHeroViewComponent } from './edit-hero-view/edit-hero-view.component';

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent,
  },
  {
    path: 'hero',
    component: EditHeroViewComponent,
  },
  {
    path: 'createHero',
    component: CreateHeroViewComponent,
  }
];

@NgModule({
  declarations: [
    HomeViewComponent,
    HeroItemListComponent,
    HeroSearchComponent,
    CreateHeroViewComponent,
    EditHeroViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class HomeModule { }
