import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {CollectionUrl} from '@interfaces/collection.interface';
import {PhotoUrl} from '@interfaces/photo.interface';
import {VideoUrl} from '@interfaces/video.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _baseUrl: string;

  constructor(private readonly _http: HttpClient) {
    this._baseUrl = environment.apiUrl;
  }

  protected _getFeaturedCollections(page: number): Observable<any> {
    return this._http.get(this._buildUrl({page}, CollectionUrl.featured));
  }

  protected _getCuratedPhotos(page: number): Observable<any> {
    return this._http.get(this._buildUrl({page}, PhotoUrl.curated));
  }

  protected _searchPhotos(query = '', page: number, color?: string): Observable<any> {
    return this._http.get(this._buildUrl(color ? {query, page, color} : {query, page}, PhotoUrl.search));
  }

  protected _getPopularVideos(page: number): Observable<any> {
    return this._http.get(this._buildUrl({page}, VideoUrl.popular));
  }

  protected _searchVideos(query: string, page: number): Observable<any> {
    return this._http.get(this._buildUrl({query, page}, VideoUrl.search));
  }

  protected _getPhoto(id: number): Observable<any> {
    return this._http.get(this._baseUrl + PhotoUrl.photo + id);
  }

  protected _getVideo(id: number): Observable<any> {
    return this._http.get(this._baseUrl + VideoUrl.video + id);
  }

  protected _getCollection(id: number, page: number): Observable<any> {
    return this._http.get(this._baseUrl + CollectionUrl.collection + id);
  }


  private _buildUrl(params: any, path: string): string {
    let url = this._baseUrl + path + '?'

    Object.keys(params).forEach(key => {
      url = url + key + '=' + params[key] + '&';
    });

    return url;
  }
}
