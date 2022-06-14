import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {HelperService} from '@services/helper.service';
import {Collection} from '@interfaces/collection.interface';
import {Pages} from '@interfaces/common.interface';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('collectionsContentContainer') collectionsContentContainer: ElementRef | undefined;
  collections$ = new BehaviorSubject<Collection[]>([]);

  constructor(
    private _router: Router,
    private _helperService: HelperService
  ) { }

  ngOnInit(): void {
    this._helperService.getEntityOnInit(Pages.collections);
  }

  ngAfterViewInit(): void {
    this._helperService.handleScrollbar(this.collectionsContentContainer, Pages.collections);
    this._setCollections();
  }

  ngOnDestroy(): void {
    this._helperService.clearPageOnDestroy();
  }

  openCollection(id: string): void {
    this._router.navigate([Pages.collections + '/' + id]);
  }

  private _setCollections(): void {
    this.collections$ = this._helperService.collections$;
  }
}
