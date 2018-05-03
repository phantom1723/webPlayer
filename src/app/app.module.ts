import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { GetMusicService } from './services/get-music.service';
import { AuthService } from './services/auth.service';


import { AppComponent } from './app.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { UserSettingsComponent } from './pages/user/user-settings/user-settings.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {UserModule} from "./pages/user/user.module";
import { HeaderComponent } from './widgets/header/header.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { PlayerComponent } from './widgets/player/player.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signUp', component: RegistrationComponent },
  { path: 'user', component: UserComponent, data: {preload: true} },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
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
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, 
      { preloadingStrategy: PreloadAllModules }),
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [ GetMusicService, AuthService, UserModule ],
  bootstrap: [ AppComponent ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
