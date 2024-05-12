import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../shared/interfaces/Hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = 'https://akabab.github.io/superhero-api/api';

  constructor( private http: HttpClient ) { }

  getAllHeroes(): Observable<Hero[]>{
    const url: string = `${this.baseUrl}/all.json`;
    return this.http.get<Hero[]>(url);
  }

  getHeroById(id: string): Observable<Hero>{
    const url: string = `${this.baseUrl}/id/${id}.json`;
    return this.http.get<Hero>(url);
  }
  

}
