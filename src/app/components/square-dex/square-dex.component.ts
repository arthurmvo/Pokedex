import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pokemon } from '../../Pokemon';
import { Router } from '@angular/router';
import { StarComponent } from '../star/star.component';

@Component({
  selector: 'app-square-dex',
  standalone: true,
  imports: [CommonModule, StarComponent],
  templateUrl: './square-dex.component.html',
  styleUrl: './square-dex.component.css',
})
export class SquareDexComponent {
  @Input() pokemon!: Pokemon;
  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate([`/details/${this.pokemon.id}`]);
  }
}
