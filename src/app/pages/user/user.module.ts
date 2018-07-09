import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";

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

    checkUser(): void {
        const isAuth = JSON.parse(localStorage.getItem('isAuth'));
        if (isAuth != true) {
            this.router.navigate(['/signIn']);
        }
    }
}
