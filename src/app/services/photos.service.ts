import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';
import {Photo, PhotosResponse, PhotoUrl} from '@interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private readonly _apiService: ApiService) { }

  getCuratedPhotos(page: number): Observable<PhotosResponse> {
    return this._apiService.get<PhotosResponse>(PhotoUrl.curated, {page});
  }

  searchPhotos(query: string, page: number, color?: string): Observable<PhotosResponse> {
    return this._apiService.get<PhotosResponse>(PhotoUrl.search, {query, page, color});
  }

  getPhoto(id: string): Observable<Photo> {
    return this._apiService.get<Photo>(PhotoUrl.photo, {id});
  }
}
