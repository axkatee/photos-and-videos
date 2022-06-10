import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';
import {Video, VideosResponse} from '@interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export class VideosService extends ApiService {

  constructor(private readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  getPopularVideos(page: number): Observable<VideosResponse> {
    return this._getPopularVideos(page);
  }

  searchVideos(query: string, page: number): Observable<VideosResponse> {
    return this._searchVideos(query, page);
  }

  getVideo(id: number): Observable<Video> {
    return this._getVideo(id);
  }
}
