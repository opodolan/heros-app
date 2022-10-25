import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero.model';

const baseUrl = 'http://localhost:3004/heros';

@Injectable({
  providedIn: 'root'
})
export class HerosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(baseUrl);
  }

  get(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${baseUrl}/${id}`);
  }

  create(data: Hero): Observable<Hero> {
    return this.http.post(baseUrl, data);
  }

  update(id: number, data: Hero): Observable<Hero> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<Hero> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByTitle(title: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${baseUrl}?title_like=${title}`);
  }
}
