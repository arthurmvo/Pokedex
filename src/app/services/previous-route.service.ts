import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//Este servico teve que ser criado para o correto funcionamento do botao de voltar dos detalhes
//pois o location.back() nao funcionava como esperado, pois ele envia para a ultima url visitada

//Este problema foi gerado pelos botoes de avançar e retroceder de pokemons na pagina de detalhes
export class PreviousRouteService {
  private previousRoute: string = '';

  constructor(private router: Router) {}

  getPreviousRoute(): string {
    return this.previousRoute;
  }

  setPreviousRoute(route: string) {
    this.previousRoute = route;
  }
}
