import { Component, Input } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../Pokemon';
import { off } from 'process';
import { CommonModule } from '@angular/common';
import { SquareDexComponent } from '../square-dex/square-dex.component';
import {
  AfterViewInit,
  ElementRef,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { stat } from 'fs';

@Component({
  selector: 'app-home-list',
  standalone: true,
  imports: [CommonModule, SquareDexComponent],
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.css',
})
export class HomeListComponent implements AfterViewInit {
  @ViewChild('containerList', { static: false }) containerList!: ElementRef;
  offset: number = 0;
  limit: number = 20;
  reload: EventEmitter<any> = new EventEmitter();
  @Input() next: EventEmitter<any> = new EventEmitter();
  @Input() previous: EventEmitter<any> = new EventEmitter();
  @Input() plus: EventEmitter<any> = new EventEmitter();
  @Input() minus: EventEmitter<any> = new EventEmitter();
  @Input() refresh: EventEmitter<any> = new EventEmitter();

  pokemons: Pokemon[] = [];
  aux_pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
    this.pokemons = this.aux_pokemons;
    this.reload.subscribe(() => {
      this.reloadData();
    });

    this.plus.subscribe(() => {
      this.limit += 20;
      this.reloadData();
    });

    this.minus.subscribe(() => {
      this.limit === 20 ? (this.limit = 20) : (this.limit -= 20);
      this.reloadData();
    });

    this.next.subscribe(() => {
      this.offset += this.limit;
      this.reloadData();
    });

    this.previous.subscribe(() => {
      if (this.offset <= this.limit) {
        this.offset = 0;
      } else {
        this.offset -= this.limit;
      }
      this.reloadData();
    });

    this.refresh.subscribe(() => {
      this.reloadData();
    });
  }

  ngAfterViewInit() {
    this.adjustHeight();
  }

  loadPokemons() {
    this.pokemonService
      .getPokemons(this.offset, this.limit)
      .subscribe((response) => {
        const data = response.results;
        for (const item of data) {
          const id = item.url.split('/')[6];
          const pokemon: Pokemon = {
            id: id,
            name: item.name,
            url: item.url,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            types: [],
          };
          this.aux_pokemons.push(pokemon);
        }
      });
  }

  adjustHeight() {
    let totalHeight = 0;
    const children = this.containerList.nativeElement.children;
    const containerWidth = this.containerList.nativeElement.offsetWidth;
    if (children[0]) {
      const childHeight = children[0].offsetHeight;
      const childWidth = children[0].offsetWidth;
      const gridGap = parseInt(
        window
          .getComputedStyle(this.containerList.nativeElement)
          .getPropertyValue('grid-gap'),
        10
      );

      const numberOfColumns = Math.round(containerWidth / childWidth);

      const rows = Math.ceil(this.limit / numberOfColumns);

      for (let i = 0; i <= rows; i++) {
        totalHeight += childHeight + gridGap;
      }

      this.containerList.nativeElement.style.height = `${totalHeight}px`;
    }
  }

  reloadData() {
    this.aux_pokemons = [];
    this.loadPokemons();
    this.adjustHeight();
    this.pokemons = this.aux_pokemons;
  }
}
