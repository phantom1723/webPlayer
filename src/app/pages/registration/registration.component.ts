import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    form: FormGroup;
    inf: any;
    error: string;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'name': new FormControl('', [
                Validators.required,
                Validators.minLength(4)
            ]),
            'email': new FormControl('', [
                Validators.required,
                Validators.minLength(4)
            ]),
            'password': new FormControl('', [
                Validators.required,
                Validators.minLength(4)
            ]),
        });
    }

    get name() {
        return this.form.get('name');
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    onSubmit() {
        const user = this.form.value;
        this.userService.createNewUser(user)
            .subscribe(data => {
                this.inf = data;
                if (this.inf.status === 200) {
                    this.error = '';
                    this.router.navigate(['/']);
                    this.userService.login(this.inf.token);

        } else {
            this.error = 'Something\'s wrong. Please, check again.';
        }
    });
}
}