import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BeerComponent } from './beer/beer.component';
import { BeersComponent } from './beers/beers.component';
import { BeerinoComponent } from './beerino/beerino.component';
import { BeerinosComponent } from './beerinos/beerinos.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'beer/:id', component: BeerComponent },
  { path: 'beers', component: BeersComponent },
  { path: 'beerino/:id', component: BeerinoComponent },
  { path: 'beerinos', component: BeerinosComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
