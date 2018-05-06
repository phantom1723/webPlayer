import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';


@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
    form: FormGroup;

    constructor(private userService: UserService) {
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

                this.userService.changeNameAndEmail(value.name, value.email)
                    .subscribe(() => {
                        console.log('email change');
                    });

                this.userService.changeUserPassword(value.password)
                    .subscribe();

    }

    deleteUser() {
        this.userService.deleteUser()
            .subscribe(() => console.log('user deleted'));
    }
}
