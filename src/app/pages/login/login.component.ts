import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    inf: any;
    error: string;


    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'email': new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ]),
            'password': new FormControl('', [
                Validators.required,
                Validators.minLength(4)
            ]),
        });
    }

    onSubmit() {
        const user = this.form.value;

        if (this.form.value.email && this.form.value.password) {
            this.userService.signInUser(user)
                .subscribe(data => {
                    this.inf = data;

                    if (this.inf.status === 200) {
                        this.error = '';
                        this.userService.login(this.inf.token);
                        this.router.navigate(['/']);
                    } else {
                        this.error = this.inf.err;
                    }
                    console.log(this.inf);
                });
        }
    }

}
