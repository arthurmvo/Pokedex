import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../Pokemon';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseAPI = environment.apiUrl;
  private apiUrl = `${this.baseAPI}pokemon`;

  constructor(private http: HttpClient) {}

  getPokemons(offset: number, limit: number): Observable<Response> {
    return this.http.get<Response>(
      `${this.apiUrl}?offset=${offset}&limit=${limit}`
    );
  }

  getDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
