import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = 'https://akabab.github.io/superhero-api/api';

  constructor( private http: HttpClient ) { }

  getAllHeroes(): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/all.json`);
  }
  

}
