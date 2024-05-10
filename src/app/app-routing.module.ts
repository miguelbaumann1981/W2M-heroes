import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from './shared/enums/Routes';

const routes: Routes = [
  {
    path: RoutePaths.HOME,
    loadChildren: () => import('@home-module/home.module').then(m => m.HomeModule)
  },
  {
    path: RoutePaths.DETAILS,
    loadChildren: () => import('@details-module/details.module').then(m => m.DetailsModule)
  },
  { 
    path: '', 
    redirectTo: RoutePaths.HOME, 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: RoutePaths.HOME, 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
