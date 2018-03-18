import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;


  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const user = this.form.value;

    this.authService.signInUser(user)
        .subscribe();
  }

}
