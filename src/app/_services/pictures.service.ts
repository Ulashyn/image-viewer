import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IThumbnails, ModelThumbnails } from '../_models/thumbnails.model';
import { IPicture } from '../_models/picture.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {
  private getImages = `${environment.apiUrl}/images`;

  constructor(
    private http: HttpClient
  ) { }

  getThumbnails(page: number, limit: number): Observable<IThumbnails> {
    const options = {
      params: new HttpParams().set('page', page.toString()).set('limit', limit.toString())
    };
    return this.http.get<IThumbnails>(this.getImages, options)
    .pipe(
      map((data) => {
        const picturesModels = new ModelThumbnails(data);
        return picturesModels;
      })
    );
  }

  getPicture(id: string): Observable<IPicture> {
    return this.http.get<IPicture>(`${this.getImages}/${id}`);
  }
}
