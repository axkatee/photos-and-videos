import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Pages} from '@interfaces/common.interface';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent {
  pages = [Pages.photos, Pages.videos, Pages.collections];

  constructor(
    private _router: Router
  ) { }

  navigateTo(page: string): void {
    this._router.navigate([page]);
  }
}
