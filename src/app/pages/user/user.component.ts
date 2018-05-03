import {Component, OnInit} from '@angular/core';

import {UserModule} from './user.module';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    isAuth: boolean;
    user: any;
    err: string;

    constructor(private userModule: UserModule) {
        this.checkUser();
    }

    ngOnInit() {
    }

    checkUser() {
        this.user = this.userModule.checkUser();
    }

}

