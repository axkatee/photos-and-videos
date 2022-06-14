import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '@services/api.service';
import {CollectionResponse, CollectionUrl, FeaturedCollectionsResponse} from '@interfaces/collection.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private readonly _apiService: ApiService) { }

  getFeaturedCollections(page: number): Observable<FeaturedCollectionsResponse> {
    return this._apiService.get<FeaturedCollectionsResponse>(CollectionUrl.featured, {page});
  }

  getCollection(id: string, page: number): Observable<CollectionResponse> {
    return this._apiService.get<CollectionResponse>(CollectionUrl.collection, {id, page});
  }
}
