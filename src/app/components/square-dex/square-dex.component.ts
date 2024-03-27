import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pokemon } from '../../Pokemon';

@Component({
  selector: 'app-square-dex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './square-dex.component.html',
  styleUrl: './square-dex.component.css',
})
export class SquareDexComponent {
  @Input() pokemon!: Pokemon;
}
