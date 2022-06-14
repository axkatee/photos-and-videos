import {ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Subject, takeUntil} from 'rxjs';
import {PhotosService} from '@services/photos.service';
import {VideosService} from '@services/videos.service';
import {CollectionsService} from '@services/collections.service';
import {Photo} from '@interfaces/photo.interface';
import {Video} from '@interfaces/video.interface';
import {Collection} from '@interfaces/collection.interface';
import {ExcludedFromMenuPages, Page, Pages} from '@interfaces/common.interface';

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

  private _searchString: string | undefined;
  private _colorString: string | undefined;

  private destroy$ = new Subject<boolean>();

  constructor(
    private _photosService: PhotosService,
    private _videosService: VideosService,
    private _collectionsService: CollectionsService
  ) { }

  getEntityOnInit(page: Page | ExcludedFromMenuPages): void {
    this._getEntity(page);
  }

  searchPhotos(value: string): void {
    this._searchString = value;
    if (!value) return this._getEntity(Pages.photos);
    this._photosService.searchPhotos(value, this._photosPage++).subscribe(res => {
     this.photos$.next([...this.photos$.getValue(), ...res.photos]);
    });
  }

  searchPhotosByColor(color: string): void {
    if (!this._searchString) return;
    this.clearPagesInfo(false);
    this._colorString = color;
    this._photosService.searchPhotos(this._searchString, this._photosPage++, color).subscribe(res => {
      this.photos$.next([...this.photos$.getValue(), ...res.photos]);
    });
  }

  searchVideos(value: string): void {
    this._searchString = value;
    if (!value) return this._getEntity(Pages.videos);
    this._videosService.searchVideos(value, this._videosPage++).subscribe(res => {
     this.videos$.next([...this.videos$.getValue(), ...res.videos]);
    })
  }

  handleScrollbar(contentContainerEl: ElementRef | undefined, page: Page | ExcludedFromMenuPages): void {
    const contentContainer = contentContainerEl?.nativeElement;

    fromEvent(contentContainer, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const limit = contentContainer.scrollHeight - contentContainer.clientHeight;
        if (contentContainer.scrollTop === limit) {
          if (this._searchString) {
            if (page === Pages.photos) {
              this._colorString
                ? this.searchPhotosByColor(this._colorString)
                : this.searchPhotos(this._searchString);
            }
            if (page === Pages.videos) return this.searchVideos(this._searchString);
          }
          else this._getEntity(page);
        }
      });
  }

  clearPageOnDestroy(): void {
    this.clearPagesInfo();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  clearPagesInfo(clearSearchString = true): void {
    if (clearSearchString) this._searchString = undefined;
    this._colorString = undefined;
    this._photosPage = 1;
    this._videosPage = 1;
    this._collectionsPage = 1;
    this._collectionInnerPage = 1;
    this.photos$.next([]);
    this.videos$.next([]);
    this.collections$.next([]);
    this.collectionInner$.next([]);
  }

  private _getEntity(page: Page, id?: string): void {
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
      case ExcludedFromMenuPages.collectionInner:
        this._collectionsService.getCollection(id!, this._collectionInnerPage++).subscribe(res => {
          this.collectionInner$.next([...this.collectionInner$.getValue(), ...res.media]);
        });
        break;
      default: return;
    }
  }

}
