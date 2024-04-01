import { Component, ElementRef, ViewChild } from '@angular/core';
import { Pokemon } from '../../Pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';
import { SquareDexComponent } from '../square-dex/square-dex.component';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SquareDexComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  mostrarAjuda = false;
  allPokemons: Pokemon[] = [];
  pokemons: Pokemon[] = [];
  searchTerm: string = '';

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  help() {
    this.mostrarAjuda = true;
  }

  search(e: Event) {
    const input = e.target as HTMLInputElement;
    const value = input.value.toLowerCase();

    this.pokemons = this.allPokemons.filter((pokemon) =>
      pokemon.name.includes(value)
    );
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
      this.favoriteService.reset();
    } else {
      console.log('localStorage is not available');
    }
  }

  loadPokemons() {
    this.pokemonService.getAll().subscribe((res) => {
      const data = res.results;
      for (const item of data) {
        const id = item.url.split('/')[6];
        const pokemon: Pokemon = {
          id: id,
          name: item.name,
          url: item.url,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          types: [],
        };
        this.allPokemons.push(pokemon);
      }
    });
    this.pokemons = this.allPokemons;
  }

  searchRoute() {
    this.router.navigate(['/search']);
  }
}
