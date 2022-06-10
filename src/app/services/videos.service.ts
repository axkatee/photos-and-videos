import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';
import {Video, VideosResponse, VideoUrl} from '@interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export class VideosService {

  constructor(private readonly _apiService: ApiService) { }

  getPopularVideos(page: number): Observable<VideosResponse> {
    return this._apiService.get<VideosResponse>(VideoUrl.popular, page);
  }

  searchVideos(query: string, page: number): Observable<VideosResponse> {
    return this._apiService.get<VideosResponse>(VideoUrl.search, query, page);
  }

  getVideo(id: number): Observable<Video> {
    return this._apiService.get<Video>(VideoUrl.video, id);
  }
}
