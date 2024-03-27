import { Component } from '@angular/core';
import { HomeListComponent } from '../../components/home-list/home-list.component';
import { off } from 'process';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  offset = 0;
  limit = 20;

  // Criar o incremento de offset e de limit conforme requisiçao
}
