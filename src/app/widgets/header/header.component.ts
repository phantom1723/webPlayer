import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    inf: any;
    form: FormControl;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.form = new FormControl();
    }

    signOut() {
        this.authService.signOutUser()
            .subscribe(data => {
                this.inf = data;
                if (this.inf.status == 200) {
                    this.router.navigate(['/signIn']);
                    this.authService.logout();
                }
                console.log(this.inf);
            });
    }

    onSubmit() {
        console.log(this.form.value);
    }
}
