import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
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


    constructor(private authService: AuthService,
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

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    onSubmit() {
        const user = this.form.value;

        if (this.form.value.email && this.form.value.password) {

            this.authService.signInUser(user)
                .subscribe(data => {
                    this.inf = data;
                    if (this.inf.user) {
                        this.error = '';
                        this.router.navigate(['/']);
                        this.authService.login(this.inf.user);
                    } else {
                        this.error = 'Something\'s wrong. Please, check again.';
                    }
                    console.log(this.inf);

                });
        }
    }

}
