import { Component, Input } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../Pokemon';
import { off } from 'process';
import { CommonModule } from '@angular/common';
import { SquareDexComponent } from '../square-dex/square-dex.component';

@Component({
  selector: 'app-home-list',
  standalone: true,
  imports: [CommonModule, SquareDexComponent],
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.css',
})
export class HomeListComponent {
  @Input() offset!: number;
  @Input() limit!: number;

  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(0, 20).subscribe((response) => {
      const data = response.results;
      for (const item of data) {
        const id = item.url.split('/')[6];
        const details = this.pokemonService.getDetails(item.url).subscribe();
        const pokemon: Pokemon = {
          id: id,
          name: item.name,
          url: item.url,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
        this.pokemons.push(pokemon);
      }
    });
  }
}
