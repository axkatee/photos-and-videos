import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';
import {Photo, PhotosResponse} from '@interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotosService extends ApiService {

  constructor(private readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  getCuratedPhotos(page: number): Observable<PhotosResponse> {
    return this._getCuratedPhotos(page);
  }

  searchPhotos(query = '', page: number, color?: string): Observable<PhotosResponse> {
    return this._searchPhotos(query, page, color);
  }

  getPhoto(id: number): Observable<Photo> {
    return this._getPhoto(id);
  }
}
