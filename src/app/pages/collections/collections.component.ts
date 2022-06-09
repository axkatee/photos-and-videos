import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, map} from 'rxjs';
import {CollectionsService} from '@services/collections.service';
import {Collection, FeaturedCollectionsResponse,} from '@interfaces/collection.interface';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit, AfterViewInit {
  @ViewChild('collectionsContentContainer') collectionsContentContainer: ElementRef | undefined;
  collections$ = new BehaviorSubject<Collection[]>([]);

  private _page = 1;

  constructor(private _collectionsService: CollectionsService) { }

  ngOnInit(): void {
    this._setCollections();
  }

  ngAfterViewInit(): void {
    const contentContainer = this.collectionsContentContainer?.nativeElement;
    const scroll$ = fromEvent(contentContainer, 'scroll')
      .pipe(
        map(() => {
          return contentContainer.scrollTop
        })
      );

    scroll$.subscribe((scrollPos) => {
      let limit = contentContainer.scrollHeight - contentContainer.clientHeight;
      if (scrollPos === limit) {
        this._page += 1;
        this._setCollections();
      }
    });
  }

  private _setCollections(): void {
    this._collectionsService.getFeaturedCollections(this._page).subscribe((res: FeaturedCollectionsResponse) => {
      const newCollections = [...this.collections$.getValue(), ...res.collections];
      this.collections$.next(newCollections);
    });
  }
}
