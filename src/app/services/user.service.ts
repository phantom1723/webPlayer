import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';


@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    login(token) {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('token', token);
    }

    logout() {
        localStorage.setItem('isAuth', 'false');
        localStorage.setItem('token', '');
    }

    recoveryPwd(email) {
        let data = {email: email};
        return this.http.post('http://localhost:8888/recoveryPwd', data, {withCredentials: true});
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
        let data = {password: password};
        return this.http.post('http://localhost:8888/user/changePassword', data, {withCredentials: true});
    }

    changeNameAndEmail(name: string, email: string) {
        let data = {name: name, email:email};
        return this.http.post('http://localhost:8888/user/changeNameAndEmail', data, {withCredentials: true});
    }

    deleteUser() {
        return this.http.get('http://localhost:8888/deleteUser', {withCredentials: true});
    }

    registrateWithGoogle() {
        return this.http.get('http://localhost:8888/auth/google', {withCredentials: true});
    }

    registrateWithTwitter() {
        return this.http.get('http://localhost:8888/auth/twitter', {withCredentials: true});
    }
}

