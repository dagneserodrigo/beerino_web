import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BeersComponent } from './beers/beers.component';
import { DevicesComponent } from './devices/devices.component';
import { ConfigurationsComponent } from './configurations/configurations.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'beers', component: BeersComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'configurations', component: ConfigurationsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
