import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IToken {
  auth: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private postAuth = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient
  ) { }

  queryToken(): Observable<IToken> {
    const httpOptions = {
      headers: new HttpHeaders().set('Content-type', 'application/json')
    };
    const body = {apiKey: environment.apiKey};
    return this.http.post<IToken>(this.postAuth, body, httpOptions);
  }
}
