import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Input() name!: string;
  @Output() unfavorited = new EventEmitter<void>();

  isFilled!: boolean;
  isHovered!: boolean;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.updateRender();
    this.favoriteService.eventObservable.subscribe(() => {
      console.log('pegou o evento');
      this.updateRender();
    });
  }

  toggleFavorite() {
    if (this.favoriteService.isFavorite(this.id)) {
      this.favoriteService.removeFavorite(this.id);
      this.isFilled = false;
      this.unfavorited.emit();
    } else {
      this.favoriteService.addFavorite(this.id, this.name);
      this.isFilled = true;
    }
  }

  updateRender() {
    this.isFilled = this.favoriteService.isFavorite(this.id);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      this.isFilled = this.favoriteService.isFavorite(this.id);
    }
  }
}
