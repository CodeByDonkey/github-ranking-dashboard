import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { FormsModule } from '@angular/forms';
import { RepoDetailComponent } from './components/repo-detail/repo-detail.component';
import { RepoStatsComponent } from './components/repo-stats/repo-stats.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RepoListComponent,
    RepoDetailComponent,
    RepoStatsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
