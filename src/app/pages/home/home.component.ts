import {
  Component,
  ElementRef,
  OnInit,
  EventEmitter,
  Output,
  Renderer2,
} from '@angular/core';
import { HomeListComponent } from '../../components/home-list/home-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() plus = new EventEmitter<void>();
  @Output() minus = new EventEmitter<void>();

  constructor(private router: Router) {}

  fplus() {
    this.plus.emit();
  }

  fminus() {
    this.minus.emit();
  }

  fnext() {
    this.next.emit();
  }

  fprevious() {
    this.previous.emit();
  }

  home() {
    this.router.navigate(['/']);
  }

  favorite() {
    console.log('clicks');
    this.router.navigate(['/favorites']);
  }
}
