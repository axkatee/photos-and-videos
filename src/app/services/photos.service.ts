import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PhotosService extends ApiService {

  constructor(private readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  getCuratedPhotos(page: number): Observable<any> {
    return this._getCuratedPhotos(page);
  }

  searchPhotos(query = '', page: number, color?: string): Observable<any> {
    return this._searchPhotos(query, page, color);
  }

  getPhoto(id: number): Observable<any> {
    return this._getPhoto(id);
  }
}
