import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  inf: any;


  constructor(private authService: AuthService,
              private router: Router) {
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
        .subscribe(data => {this.inf = data;
          if(this.inf.status === '200') {
            this.router.navigate(['/']);
          }
          console.log(this.inf);});
  }

}
