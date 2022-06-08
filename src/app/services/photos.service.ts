import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {PhotoUrl} from '@interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  getPhotos(): Observable<any> {
    return this.http.get(this.baseUrl + PhotoUrl.curated);
  }
}
