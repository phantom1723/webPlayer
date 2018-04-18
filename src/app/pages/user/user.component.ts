import {Component, OnInit} from '@angular/core';

import {UserModule} from './user.module';
import {FormControl} from "@angular/forms";
import {GetMusicService} from "../../services/get-music.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    isAuth: boolean;
    user: any;
    inf: any;
    form: FormControl;
    tracks: any;
    localStorage = localStorage;

    constructor(private  userModule: UserModule,
                private  getMusicService: GetMusicService,
                private  router: Router) {
        this.checkUser();
        this.playlists();
    }

    ngOnInit() {
        this.form = new FormControl();
    }

    checkUser() {
        this.user = this.userModule.checkUser();
    }

    createPlaylist() {
        this.getMusicService.createPlaylist(this.form.value)
            .subscribe(data => {
                this.inf = JSON.parse(data);
                console.log(this.inf);
            });
    }

    playlists() {
        this.getMusicService.getPlaylist()
            .subscribe(data => {
                console.log(data);
            });
    }

    onSubmit() {
        this.localStorage.setItem('tracks', JSON.stringify(this.tracks));
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 1000);
    }
}
