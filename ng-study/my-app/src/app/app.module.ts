import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'

import {HeroDetailComponent} from './hero-detail.component'
import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes.component'
import {HeroService} from './hero.service'
import {DashboardComponent} from './dashboard.component'
import {HeroSearchComponent} from './hero-search.component'

import {AppRoutingModule} from './app-routing.module'

import {InMemoryWebApiModule} from 'angular-in-memory-web-api'
import {InMemoryDataService} from './in-memory-data.service'

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
