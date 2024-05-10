import { Component } from '@angular/core';
import { RoutePaths } from './shared/enums/Routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public titleApp: string = 'W2M Heroes';
  public navigationMenu: any[] = [
    {
      link: 'Home',
      url: RoutePaths.HOME,
      isActive: true
    },
    {
      link: 'Details',
      url: RoutePaths.DETAILS,
      isActive: false
    }
  ];

}
