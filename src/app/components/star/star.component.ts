import { Component, Input } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star.component.html',
  styleUrl: './star.component.css',
})
export class StarComponent {
  @Input() id!: number;

  isFavorite!: string;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.isFavorite = this.favoriteService.isFavorite(this.id)
      ? 'filled'
      : 'unfilled';
  }

  toggleFavorite() {
    if (this.favoriteService.isFavorite(this.id)) {
      this.favoriteService.removeFavorite(this.id);
      this.isFavorite = 'unfilled';
    } else {
      this.favoriteService.addFavorite(this.id);
      this.isFavorite = 'filled';
    }
  }
}
