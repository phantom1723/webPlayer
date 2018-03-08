import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { GetMusicService } from './services/get-music.service';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const appRoutes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'user-settings', component: UserSettingsComponent },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UserSettingsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ GetMusicService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
