import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsViewComponent } from './details-view/details-view.component';
import { RouterModule, Routes } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: DetailsViewComponent,
  }
];

@NgModule({
  declarations: [
    DetailsViewComponent,
    HeroCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DetailsModule { }
