import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ng2-bootstrap/modal';
import { CKEditorModule } from 'ng2-ckeditor';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BeersComponent } from './beers/beers.component';
import { BeerinoComponent } from './beerino/beerino.component';
import { BeerinosComponent } from './beerinos/beerinos.component';
import { TasksComponent } from './tasks/tasks.component';
import { BeerComponent } from './beer/beer.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    BeersComponent,
    BeerinoComponent,
    BeerinosComponent,
    TasksComponent,
    BeerComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    CKEditorModule
  ],
  providers: [
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
