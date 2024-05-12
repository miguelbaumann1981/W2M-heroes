import { Component } from '@angular/core';
import { RoutePaths } from './shared/enums/Routes';

interface MenuItem {
  link: string;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public titleApp: string = 'W2M Heroes';
  public navigationMenu: MenuItem[] = [
    {
      link: 'Home',
      url: RoutePaths.HOME
    },
    {
      link: 'Details',
      url: RoutePaths.DETAILS
    }
  ];

}
