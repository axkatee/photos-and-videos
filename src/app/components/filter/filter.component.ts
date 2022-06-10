import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter, map, Subscription} from 'rxjs';
import {COLORS, PAGE_WITH_ACCESS_SEARCH_BY_COLOR, PAGE_WITHOUT_SEARCH} from '@consts';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  colors = COLORS;
  pageWithAccessSearchByColor = PAGE_WITH_ACCESS_SEARCH_BY_COLOR;
  pageWithoutSearch = PAGE_WITHOUT_SEARCH;
  isMenuTriggered = false;
  currentPage: string | undefined;

  private _routerEventsSubscription: Subscription | undefined;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._handleUrlChanges();
  }

  ngOnDestroy() {
    this._routerEventsSubscription?.unsubscribe();
  }

  private _handleUrlChanges(): void {
    this._routerEventsSubscription = this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => (event as NavigationEnd).url.replace('/', '')),
        distinctUntilChanged())
      .subscribe(path => {
        this.currentPage = path;
      })
  }
}
