import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, map} from 'rxjs';
import {VideosService} from '@services/videos.service';
import {Video, VideosResponse} from '@interfaces/video.interface';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, AfterViewInit {
  @ViewChild('videosContentContainer') videosContentContainer: ElementRef | undefined;
  videos$ = new BehaviorSubject<Video[]>([]);

  private _page = 1;

  constructor(private _videosService: VideosService) { }

  ngOnInit(): void {
    this._setVideos();
  }

  ngAfterViewInit(): void {
    const contentContainer = this.videosContentContainer?.nativeElement;

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
        this._setVideos();
      }
    });
  }

  private _setVideos(): void {
    this._videosService.getPopularVideos(this._page).subscribe((res: VideosResponse) => {
      const newVideos = [...this.videos$.getValue(), ...res.videos];
      this.videos$.next(newVideos);
    });
  }
}
