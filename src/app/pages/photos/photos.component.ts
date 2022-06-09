import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, map} from 'rxjs';
import {PhotosService} from '@services/photos.service';
import {Photo, PhotosResponse} from '@interfaces/photo.interface';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, AfterViewInit {
  @ViewChild('photosContentContainer') photosContentContainer: ElementRef | undefined;
  photos$ = new BehaviorSubject<Photo[]>([]);

  private _page = 1;

  constructor(private _photosService: PhotosService) { }

  ngOnInit(): void {
    this._setPhotos();
  }

  ngAfterViewInit(): void {
    const contentContainer = this.photosContentContainer?.nativeElement;

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
        this._setPhotos();
      }
    });
  }

  private _setPhotos(): void {
    this._photosService.getCuratedPhotos(this._page).subscribe((res: PhotosResponse) => {
      const newPhotos = [...this.photos$.getValue(), ...res.photos];
      this.photos$.next(newPhotos);
    });
  }
}
