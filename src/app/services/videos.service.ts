import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';

@Injectable({
  providedIn: 'root',
})
export class VideosService extends ApiService {

  constructor(private readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  getPopularVideos(page: number): Observable<any> {
    return this._getPopularVideos(page);
  }

  searchVideos(query: string, page: number): Observable<any> {
    return this._searchVideos(query, page);
  }

  getVideo(id: number): Observable<any> {
    return this._getVideo(id);
  }
}
