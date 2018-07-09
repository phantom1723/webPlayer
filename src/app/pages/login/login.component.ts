import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
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
                .subscribe((data: any) => {
                    if (data.status === 200) {
                        this.error = '';
                        this.userService.login(data.token);
                        this.router.navigate(['/']);
                    } else {
                        this.error = data.err;
                    }
                });
        }
    }
}
