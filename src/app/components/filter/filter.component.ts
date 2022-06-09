import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilChanged} from 'rxjs';
import {COLORS, PAGE_WITH_ACCESS_SEARCH_BY_COLOR, PAGE_WITHOUT_SEARCH} from '@consts';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  colors = COLORS;
  pageWithAccessSearchByColor = PAGE_WITH_ACCESS_SEARCH_BY_COLOR;
  pageWithoutSearch = PAGE_WITHOUT_SEARCH;
  isMenuTriggered = false;
  currentPage: string | undefined;

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._handleUrlChanges();
  }

  private _handleUrlChanges(): void {
    this._activatedRoute.url.pipe(distinctUntilChanged()).subscribe(urlSegment => {
      this.currentPage = urlSegment[0].path;
    });
  }

}
