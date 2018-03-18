import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  createNewUser(user: User) {
    return this.http.post('http://localhost:8888/signUp', user);
  }

  signInUser(user: User) {
    return this.http.post('http://localhost:8888/signIn', user);
  }

  signOutUser() {
    return this.http.get('http://localhost:8888/signOut');
  }

  listen() {
    return this.http.get('http://localhost:8888/music');
  }
}

