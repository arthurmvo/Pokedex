import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../Pokemon';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  pokemon!: Pokemon;
  description!: string;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pokemonService
        .getDescription(parseInt(params['id']))
        .subscribe((res) => {
          const desc = res.flavor_text_entries.find(
            (entry: { language: { name: string } }) =>
              entry.language.name === 'en'
          );
          console.log(desc);
          this.description = desc.flavor_text.replace(/\f/g, ' ');
          console.log(this.description);
        });

      this.pokemon = {
        id: parseInt(params['id']),
        name: '',
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${params['id']}.gif`,
        url: '',
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
}
