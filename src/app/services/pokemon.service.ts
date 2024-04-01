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
  private allUrl = `${this.baseAPI}pokemon?limit=1400`;
  private descriptionUrl = `${this.baseAPI}pokemon-species`;

  constructor(private http: HttpClient) {}

  getPokemons(offset: number, limit: number): Observable<Response> {
    return this.http.get<Response>(
      `${this.apiUrl}?offset=${offset}&limit=${limit}`
    );
  }

  getAll(): Observable<Response> {
    return this.http.get<Response>(`${this.allUrl}`);
  }

  getDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getDescription(id: number): Observable<any> {
    return this.http.get<any>(`${this.descriptionUrl}/${id}`);
    // return this.description(this.http.get<any>(`${this.descriptionUrl}/${id}`));
  }
}
