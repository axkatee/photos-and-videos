import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _baseUrl: string;

  constructor(private readonly _http: HttpClient) {
    this._baseUrl = environment.apiUrl;
  }

  get<T>(path: string, ...params: any): Observable<T> {
    return this._http.get<T>(this._buildUrl({...params}, path));
  }

  private _buildUrl(params: any, path: string): string {
    let url = this._baseUrl + path + '?';

    Object.keys(params).forEach(key => {
      url = url + key + '=' + params[key] + '&';
    });

    return url;
  }
}
