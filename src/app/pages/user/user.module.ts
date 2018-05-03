import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import * as jwt_decode from 'jwt-decode';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class UserModule {
    user: string;

    constructor(private router: Router) {
        this.checkUser();
    }

    checkUser(): string {
        const isAuth = JSON.parse(localStorage.getItem('isAuth'));
        let data,
        decodedInf;
        if (isAuth == true) {
            data = localStorage.getItem('token');
            data = jwt_decode(data);
            return this.user = data;
        } else {
            this.router.navigate(['/signIn']);
        }
    }
}
