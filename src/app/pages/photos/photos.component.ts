import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HelperService} from '@services/helper.service';
import {Photo} from '@interfaces/photo.interface';
import {Pages} from '@interfaces/common.interface';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('photosContentContainer') photosContentContainer: ElementRef | undefined;
  photos$ = new BehaviorSubject<Photo[]>([]);

  constructor(private _helperService: HelperService) { }

  ngOnInit(): void {
    this._helperService.getEntityOnInit(Pages.photos);
  }

  ngAfterViewInit(): void {
    this._helperService.handleScrollbar(this.photosContentContainer, Pages.photos);
    this._setPhotos();
  }

  ngOnDestroy(): void {
    this._helperService.clearPageOnDestroy();
  }

  private _setPhotos(): void {
    this.photos$ = this._helperService.photos$;
  }
}
