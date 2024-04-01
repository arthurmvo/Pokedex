import { Component, EventEmitter, Output } from '@angular/core';
import { HomeListComponent } from '../../components/home-list/home-list.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HelpComponent } from '../../components/help/help.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeListComponent, CommonModule, HelpComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  mostrarAjuda!: boolean;
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() plus = new EventEmitter<void>();
  @Output() minus = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('visited')) {
      this.mostrarAjuda = true;
      localStorage.setItem('visited', 'true');
    }
  }

  close() {
    this.mostrarAjuda = false;
  }

  help() {
    this.mostrarAjuda = true;
  }

  clearLocalStorage() {
    this.refresh.emit();
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('favorites');
    } else {
      console.log('localStorage is not available');
    }
  }

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
    this.router.navigate(['/favorites']);
  }

  search() {
    this.router.navigate(['/search']);
  }
}
