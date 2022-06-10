import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';
import {CollectionResponse, FeaturedCollectionsResponse} from '@interfaces/collection.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService extends ApiService {

  constructor(private readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  getFeaturedCollections(page: number): Observable<FeaturedCollectionsResponse> {
    return this._getFeaturedCollections(page);
  }

  getCollection(id: number, page: number): Observable<CollectionResponse> {
    return this._getCollection(id, page);
  }
}
