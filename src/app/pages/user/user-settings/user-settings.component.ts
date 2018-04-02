import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';


@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
    form: FormGroup;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'name': new FormControl('', [
                Validators.minLength(4)
            ]),
            'email': new FormControl('', [
                Validators.minLength(4)
            ]),
            'password': new FormControl('', [
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
        let value = this.form.value;

        if (value.name) {
            this.authService.changeUserName(value.name)
                .subscribe(data => {
                    console.log('name change');
                });

            if (value.email) {
                this.authService.changeUserEmail(value.email)
                    .subscribe(data => {
                        console.log('email change');
                    });
            }
            if (value.password) {
                this.authService.changeUserEmail(value.email)
                    .subscribe(data => {
                        console.log('password change');
                    });
            }
        }
    }

    deleteUser() {
        this.authService.deleteUser()
            .subscribe(() => console.log('user deleted'));
    }
}
