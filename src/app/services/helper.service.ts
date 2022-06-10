import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';
import {PhotosService} from '@services/photos.service';
import {VideosService} from '@services/videos.service';
import {CollectionsService} from '@services/collections.service';
import {Photo} from '@interfaces/photo.interface';
import {Video} from '@interfaces/video.interface';
import {Collection} from '@interfaces/collection.interface';
import {Page, Pages} from '@interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  photos$ = new BehaviorSubject<Photo[]>([]);
  videos$ = new BehaviorSubject<Video[]>([]);
  collections$ = new BehaviorSubject<Collection[]>([]);
  collectionInner$ = new BehaviorSubject<(Photo | Video)[]>([]);

  private _photosPage = 1;
  private _videosPage = 1;
  private _collectionsPage = 1;
  private _collectionInnerPage = 1;

  private _scrollSubscription: Subscription | undefined;

  constructor(
    private _photosService: PhotosService,
    private _videosService: VideosService,
    private _collectionsService: CollectionsService
  ) { }

  getEntityOnInit(page: Page): void {
    this._getEntity(page);
  }

  handleScrollbar(contentContainerEl: ElementRef | undefined, page: Page): void {
    const contentContainer = contentContainerEl?.nativeElement;

    const scroll$ = fromEvent(contentContainer, 'scroll');

    this._scrollSubscription = scroll$.subscribe(() => {
      let limit = contentContainer.scrollHeight - contentContainer.clientHeight;
      if (contentContainer.scrollTop === limit) {
        this._getEntity(page);
      }
    });
  }

  clearPage(): void {
    this._scrollSubscription?.unsubscribe();
    this._clearPageInfo();
  }

  private _getEntity(page: Page): void {
    switch (page) {
      case Pages.photos:
        this._photosService.getCuratedPhotos(this._photosPage++).subscribe(res => {
          this.photos$.next([...this.photos$.getValue(), ...res.photos]);
        });
        break;
      case Pages.videos:
        this._videosService.getPopularVideos(this._videosPage++).subscribe(res => {
          this.videos$.next([...this.videos$.getValue(), ...res.videos]);
        });
        break;
      case Pages.collections:
        this._collectionsService.getFeaturedCollections(this._collectionsPage++).subscribe(res => {
          this.collections$.next([...this.collections$.getValue(), ...res.collections]);
        });
        break;
      default: return;
    }
  }

  private _clearPageInfo(): void {
    this._photosPage = 1;
    this._videosPage = 1;
    this._collectionsPage = 1;
    this._collectionInnerPage = 1;
    this.photos$.next([]);
    this.videos$.next([]);
    this.collections$.next([]);
    this.collectionInner$.next([]);
  }

}
