import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    form: FormGroup;
    inf: any;


    constructor(private authService: AuthService,
                private router: Router,) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'name': new FormControl('', Validators.required),
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required),
        });
    }

    onSubmit() {
        const user = this.form.value;

        this.authService.createNewUser(user)
            .subscribe(data => data = this.inf);
        console.log(this.inf);

}

listen() {
    this.authService.listen()
        .subscribe(data => this.inf);

}

}