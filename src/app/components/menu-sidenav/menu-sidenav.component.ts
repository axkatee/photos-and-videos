import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {PAGES} from '@consts';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent {
  pages = PAGES;

  constructor(
    private _router: Router
  ) { }

  navigateTo(page: string): void {
    this._router.navigate([page]);
  }
}
