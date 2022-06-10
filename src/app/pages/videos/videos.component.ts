import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HelperService} from '@services/helper.service';
import {Video} from '@interfaces/video.interface';
import {Pages} from '@interfaces/common.interface';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videosContentContainer') videosContentContainer: ElementRef | undefined;
  videos$ = new BehaviorSubject<Video[]>([]);

  constructor(private _helperService: HelperService) { }

  ngOnInit(): void {
    this._helperService.getEntityOnInit(Pages.videos);
  }

  ngAfterViewInit(): void {
    this._helperService.handleScrollbar(this.videosContentContainer, Pages.videos);
    this._setVideos();
  }

  ngOnDestroy(): void {
    this._helperService.clearPage();
  }

  private _setVideos(): void {
    this.videos$ = this._helperService.videos$;
  }
}
