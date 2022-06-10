import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {
  CollectionResponse,
  CollectionUrl,
  FeaturedCollectionsResponse,
} from '@interfaces/collection.interface';
import {Photo, PhotosResponse, PhotoUrl} from '@interfaces/photo.interface';
import {Video, VideosResponse, VideoUrl} from '@interfaces/video.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _baseUrl: string;

  constructor(private readonly _http: HttpClient) {
    this._baseUrl = environment.apiUrl;
  }

  protected _getFeaturedCollections(page: number): Observable<FeaturedCollectionsResponse> {
    return this._http.get<FeaturedCollectionsResponse>(this._buildUrl({page}, CollectionUrl.featured));
  }

  protected _getCuratedPhotos(page: number): Observable<PhotosResponse> {
    return this._http.get<PhotosResponse>(this._buildUrl({page}, PhotoUrl.curated));
  }

  protected _searchPhotos(query = '', page: number, color?: string): Observable<PhotosResponse> {
    return this._http.get<PhotosResponse>(this._buildUrl(color ? {query, page, color} : {query, page}, PhotoUrl.search));
  }

  protected _getPopularVideos(page: number): Observable<VideosResponse> {
    return this._http.get<VideosResponse>(this._buildUrl({page}, VideoUrl.popular));
  }

  protected _searchVideos(query: string, page: number): Observable<VideosResponse> {
    return this._http.get<VideosResponse>(this._buildUrl({query, page}, VideoUrl.search));
  }

  protected _getPhoto(id: number): Observable<Photo> {
    return this._http.get<Photo>(this._baseUrl + PhotoUrl.photo + id);
  }

  protected _getVideo(id: number): Observable<Video> {
    return this._http.get<Video>(this._baseUrl + VideoUrl.video + id);
  }

  protected _getCollection(id: number, page: number): Observable<CollectionResponse> {
    return this._http.get<CollectionResponse>(this._baseUrl + CollectionUrl.collection + id);
  }


  private _buildUrl(params: any, path: string): string {
    let url = this._baseUrl + path + '?'

    Object.keys(params).forEach(key => {
      url = url + key + '=' + params[key] + '&';
    });

    return url;
  }
}
