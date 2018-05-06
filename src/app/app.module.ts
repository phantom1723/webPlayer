import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { GetMusicService } from './services/get-music.service';
import { UserService } from './services/user.service';


import { AppComponent } from './app.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { UserSettingsComponent } from './pages/user/user-settings/user-settings.component';
import {UserModule} from "./pages/user/user.module";
import { HeaderComponent } from './widgets/header/header.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { PlayerComponent } from './widgets/player/player.component';
import {RecoveryComponent} from "./pages/recovery/recovery.component";

const appRoutes: Routes = [
  { path: 'signUp', component: RegistrationComponent },
  { path: 'signIn', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: '',   redirectTo: '/signIn', pathMatch: 'full' },
  { path: 'user/settings', component: UserSettingsComponent },
  { path: '**', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UserSettingsComponent,
    RecoveryComponent,
    HeaderComponent,
    FooterComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
      RouterTestingModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ GetMusicService, UserService, UserModule ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
