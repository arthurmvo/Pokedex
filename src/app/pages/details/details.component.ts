import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../Pokemon';
import { CommonModule, Location } from '@angular/common';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { PreviousRouteService } from '../../services/previous-route.service';
import { StarComponent } from '../../components/star/star.component';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, StarComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @ViewChild('Audio') audio!: ElementRef;
  @Output() reset = new EventEmitter<void>();
  pokemon!: Pokemon;
  prevPokemon!: Pokemon;
  nextPokemon!: Pokemon;
  description!: string;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private favoriteService: FavoriteService,
    private previousRoute: PreviousRouteService
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.route.params.subscribe((params) => {
      const id = parseInt(params['id']);
      this.pokemonService.getDescription(id).subscribe((res) => {
        const desc = res.flavor_text_entries.find(
          (entry: { language: { name: string } }) =>
            entry.language.name === 'en'
        );

        this.description = desc.flavor_text.replace(/\f/g, ' ');
      });
      this.pokemonService.getDetails((id - 1).toString()).subscribe((res) => {
        this.prevPokemon = {
          id: id - 1,
          name: res.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${
            id - 1
          }.gif`,
          url: '',
          types: [],
        };
      });

      this.pokemonService.getDetails((id + 1).toString()).subscribe((res) => {
        this.nextPokemon = {
          id: id + 1,
          name: res.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${
            id + 1
          }.gif`,
          url: '',
          types: [],
        };
      });

      this.pokemon = {
        id: id,
        name: '',
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${params['id']}.gif`,
        url: '',
        types: [],
      };

      this.pokemonService.getDetails(params['id']).subscribe((res) => {
        this.pokemon.name = res.name;
        this.pokemon.height = res.height;
        this.pokemon.weight = res.weight;
        this.pokemon.stats = [
          { name: 'hp', value: res.stats[0].base_stat },
          { name: 'attack', value: res.stats[1].base_stat },
          { name: 'defense', value: res.stats[2].base_stat },
          { name: 'special attack', value: res.stats[3].base_stat },
          { name: 'special defense', value: res.stats[4].base_stat },
          { name: 'speed', value: res.stats[5].base_stat },
        ];
        this.pokemon.types = res.types.map(
          (type: { slot: number; type: { name: string; url: string } }) =>
            type.type.name
        );
        this.pokemon.abilities = res.abilities.map(
          (ability: {
            ability: { name: string; url: string };
            is_hidden: boolean;
            slot: number;
          }) => ability.ability.name
        );
        this.pokemon.cry = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
        this.audio.nativeElement.load();
      });
    });
  }

  fnext() {
    this.router.navigate([`/details/${this.pokemon.id + 1}`]);
  }

  fprevious() {
    this.router.navigate([`/details/${this.pokemon.id - 1}`]);
  }

  home() {
    this.router.navigate(['/']);
  }

  favorite() {
    this.router.navigate(['/favorites']);
  }

  goBack() {
    // this.location.back(); Nao posso usar neste caso. Esta funcao envia para a ultima url visitada
    // Entao caso o caminho seja home -> details do pokemon 1, e entao eu escolha ir para o pokemon 2 na pagina de details
    // esta funcao me enviaria para o pokemon 1, e nao para a home.

    // Para resolver este problema, foi criado um servico que guarda a ultima url visitada
    this.router.navigate([this.previousRoute.getPreviousRoute()]);
    // console.log(this.previousRoute.getPreviousRoute());
  }

  clearLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
      this.favoriteService.reset();
      console.log('emited');
    } else {
      console.log('localStorage is not available');
    }
  }

  search() {
    this.router.navigate(['/search']);
  }
}
