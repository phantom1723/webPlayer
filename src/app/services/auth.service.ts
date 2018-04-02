import {Injectable} from '@angular/core';
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

    changeUserPassword(password: string) {
        return this.http.post('http://localhost:8888/changePassword', password, {withCredentials: true});
    }

    changeUserName(name: string) {
        return this.http.post('http://localhost:8888/changeName', name, {withCredentials: true});
    }

    changeUserEmail(email: string) {
        return this.http.post('http://localhost:8888/changeEmail', email, {withCredentials: true});
    }

    deleteUser() {
        return this.http.get('http://localhost:8888/deleteUser', {withCredentials: true});
    }
}

