import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoritesKey = 'favorites';

  constructor() {}

  addFavorite(id: number) {
    let favorites = this.getFavorites();
    favorites.push(id);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  removeFavorite(id: number) {
    let favorites = this.getFavorites();
    favorites = favorites.filter((favorite: number) => favorite !== id);
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
    return favorites.includes(id);
  }
}
