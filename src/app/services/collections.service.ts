import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService extends ApiService {

  constructor(private readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  getFeaturedCollections(page: number): Observable<any> {
    return this._getFeaturedCollections(page);
  }

  getCollection(id: number, page: number): Observable<any> {
    return this._getCollection(id, page);
  }
}
