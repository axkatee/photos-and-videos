import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, fromEvent, map, Subject, takeUntil} from 'rxjs';
import {HelperService} from '@services/helper.service';
import {Pages} from '@interfaces/common.interface';
import {COLORS, PAGE_WITH_ACCESS_SEARCH_BY_COLOR, PAGE_WITHOUT_SEARCH} from '@consts';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef | undefined;

  colors = COLORS;
  pageWithAccessSearchByColor = PAGE_WITH_ACCESS_SEARCH_BY_COLOR;
  pageWithoutSearch = PAGE_WITHOUT_SEARCH;
  currentPage: string | undefined;
  isMenuTriggered = false;

  private destroy$ = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this._handleUrlChanges();
  }

  ngAfterViewInit() {
    this._handleSearchInput();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  searchByColor(event: Event | string): void {
    const color = typeof event === 'string' ? event : (event.target as any).value.replace('#', '');
    this._helperService.searchPhotosByColor(color);
  }

  private _handleUrlChanges(): void {
    this._router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(event => event instanceof NavigationEnd),
        map(event => (event as NavigationEnd).url.replace('/', '')),
        distinctUntilChanged())
      .subscribe(path => {
        this.currentPage = path;
        if (this.searchInput) this.searchInput.nativeElement.value = '';
      })
  }

  private _handleSearchInput(): void {
    fromEvent<KeyboardEvent>(this.searchInput?.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.destroy$),
        map(event => (event.target as HTMLInputElement).value),
        debounceTime(1000)
      )
      .subscribe(value => {
        this._helperService.clearPagesInfo();
        if (this.currentPage === Pages.photos) this._helperService.searchPhotos(value);
        if (this.currentPage === Pages.videos) this._helperService.searchVideos(value);
      });
  }
}
