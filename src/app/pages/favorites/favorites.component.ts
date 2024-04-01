import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareDexComponent } from '../../components/square-dex/square-dex.component';
import { FavoriteService } from '../../services/favorite.service';
import { Pokemon } from '../../Pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, SquareDexComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  pokemons: Pokemon[] = [];
  empty!: boolean;
  aux_pokemons: Pokemon[] = [];
  return: any;

  constructor(private favorites: FavoriteService, private router: Router) {}

  loadFavorites() {
    this.aux_pokemons = [];
    const favs = this.favorites
      .getFavorites()
      .map((item: { id: number; name: string }) => item)
      .sort((a, b) => a.id - b.id);

    favs.forEach((poke) => {
      const pokemon: Pokemon = {
        id: poke.id,
        name: poke.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`,
        url: '',
        types: [],
      };
      this.aux_pokemons.push(pokemon);
    });
  }

  ngOnInit() {
    this.loadFavorites();
    this.pokemons = this.aux_pokemons;
    this.empty = this.pokemons.length === 0 ? true : false;
  }

  unfavoritePokemon(id: number) {
    this.loadFavorites();
    this.pokemons = this.aux_pokemons;
  }

  home() {
    this.router.navigate(['/']);
  }

  favorite() {
    this.router.navigate(['/favorites']);
  }

  clearLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
      this.loadFavorites();
      this.pokemons = this.aux_pokemons;
      this.empty = true;
    } else {
      console.log('localStorage is not available');
    }
  }

  search() {
    this.router.navigate(['/search']);
  }
}
