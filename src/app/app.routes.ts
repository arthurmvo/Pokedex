import { Routes } from '@angular/router';

import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';
import { HelpComponent } from './components/help/help.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'search', component: SearchComponent },
  // { path: 'test', component: HelpComponent },
];
