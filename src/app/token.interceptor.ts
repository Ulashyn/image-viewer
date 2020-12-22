import { IToken } from './_services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.tokenInit().token;
    if (request.url.includes('auth')) {
      return next.handle(request);
    }
    const authReq = request.clone({
      headers: request.headers.set('Authorization', authToken)
    });

    return next.handle(authReq);
  }

  private tokenInit(): IToken  {
    const initDataForToken = this.isTokenInLocalStorage()
      ? JSON.parse(localStorage.getItem('apiObject') || '')
      : {};
    return initDataForToken;
  }

  private isTokenInLocalStorage(): boolean {
    const tokenObj = localStorage.getItem('apiObject');
    return tokenObj !== null;
  }
}
