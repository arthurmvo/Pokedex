import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoritesKey = 'favorites';
  private eventSubject = new Subject<any>();

  eventObservable = this.eventSubject.asObservable();

  constructor() {}

  addFavorite(id: number, name: string) {
    let favorites = this.getFavorites();
    favorites.push({ id: id, name: name });
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  removeFavorite(id: number) {
    let favorites = this.getFavorites();
    favorites = favorites.filter((favorite: any) => favorite.id !== id); // Filter based on the id property
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  getFavorites(): any[] {
    let favorites = localStorage.getItem(this.favoritesKey);
    if (favorites) {
      return JSON.parse(favorites);
    }
    return [];
  }

  isFavorite(id: number): boolean {
    let favorites = this.getFavorites();
    return favorites.some((favorite: any) => favorite.id == id);
  }

  reset() {
    this.eventSubject.next(null);
  }
}
