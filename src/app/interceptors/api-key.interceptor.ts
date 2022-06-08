import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '@environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  private readonly apiKey: string;

  constructor() {
    this.apiKey = environment.apiKey;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.set('Authorization', this.apiKey)
    });

    return next.handle(req).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
