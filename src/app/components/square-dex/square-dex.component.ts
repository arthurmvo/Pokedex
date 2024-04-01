import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../Pokemon';
import { Router } from '@angular/router';
import { StarComponent } from '../star/star.component';
import { PreviousRouteService } from '../../services/previous-route.service';

@Component({
  selector: 'app-square-dex',
  standalone: true,
  imports: [CommonModule, StarComponent],
  templateUrl: './square-dex.component.html',
  styleUrl: './square-dex.component.css',
})
export class SquareDexComponent {
  @Output() unfavorited = new EventEmitter<number>();
  @Input() pokemon!: Pokemon;
  constructor(
    private router: Router,
    private previousRoute: PreviousRouteService
  ) {}

  goToDetails() {
    this.router.navigate([`/details/${this.pokemon.id}`]);
    this.previousRoute.setPreviousRoute(this.router.url);
    // console.log(this.previousRoute.getPreviousRoute());
  }

  unfavoritePokemon() {
    if (this.router.url === '/favorites') {
      this.unfavorited.emit(this.pokemon.id);
    }
  }
}
