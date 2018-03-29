import { Component, OnInit } from '@angular/core';
import {GetMusicService, RequestedDataInterface} from '../../services/get-music.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inf: any;


  constructor(private getMusicService: GetMusicService,
              private authService: AuthService,
              private router: Router) {
    this.showData();

  }

showData() {
    this.getMusicService.getData()
        .subscribe(data => {
          this.inf = data;
        });

  };

  signOut() {
     this.authService.signOutUser()
        .subscribe(data => {
            this.inf = data;
            if (this.inf.status == 200) {
                this.router.navigate(['/signIn']);
                this.authService.logout();
            }
            console.log(this.inf);});
  }

    listen() {
        this.authService.listen()
            .subscribe(data => {
                this.inf = JSON.parse(data);
                console.log(this.inf.tracks.tracks.items[1]);
            });
    }


  ngOnInit() {
  }


}
