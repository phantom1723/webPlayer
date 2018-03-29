import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class UserModule {
  user: string;

  constructor( private router: Router) {
    this.checkUser();
  }
  checkUser(): string {
    const isAuth = JSON.parse(localStorage.getItem('isAuth'));
    let data;
    if (isAuth == true) {
      data = JSON.parse(localStorage.getItem('user'));
    }

    if (isAuth == false) {
      this.router.navigate(['/signIn']);
    } else {
      return this.user = data;
    }
  }
}
