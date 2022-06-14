import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HelperService} from '@services/helper.service';
import {Photo} from '@interfaces/photo.interface';
import {Video} from '@interfaces/video.interface';
import {ExcludedFromMenuPages} from '@interfaces/common.interface';

@Component({
  selector: 'app-collection-inner',
  templateUrl: './collection-inner.component.html',
  styleUrls: ['./collection-inner.component.scss']
})
export class CollectionInnerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('collectionContentContainer') collectionContentContainer: ElementRef | undefined;
  collectionInner$ = new BehaviorSubject<(Photo | Video)[]>([]);

  constructor(private _helperService: HelperService) { }

  ngOnInit(): void {
    this._helperService.getEntityOnInit(ExcludedFromMenuPages.collectionInner);
  }

  ngAfterViewInit(): void {
    this._helperService.handleScrollbar(this.collectionContentContainer, ExcludedFromMenuPages.collectionInner);
    this._setCollectionInner();
  }

  ngOnDestroy(): void {
    this._helperService.clearPageOnDestroy();
  }

  private _setCollectionInner(): void {
    this.collectionInner$ = this._helperService.collectionInner$;
  }

}
