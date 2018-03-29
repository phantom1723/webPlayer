import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';


@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(user) {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('user', JSON.stringify({name: user.name}));
    }

    logout() {
        localStorage.setItem('isAuth', 'false');
        localStorage.setItem('user', '');
    }

    createNewUser(user: User) {
        return this.http.post('http://localhost:8888/signUp', user, {withCredentials: true});
    }

    signInUser(user: User) {
        return this.http.post('http://localhost:8888/signIn', user, {withCredentials: true});
    }

    signOutUser() {
        return this.http.get('http://localhost:8888/signOut', {withCredentials: true});
    }

    listen() {
        return this.http.get('http://localhost:8888/searchTrackByName:numb', {responseType: 'text'});
    }
}

