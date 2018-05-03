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
    form: FormControl;
    tracks: any;
    localStorage = localStorage;
    playlist: any;

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
        console.log(this.form.value);
        this.getMusicService.createPlaylist(this.form.value)
            .subscribe(data => {
                this.playlists();
            });
    }

    playlists() {
        this.getMusicService.getPlaylist()
            .subscribe(data => {
                this.playlist = data.tracks.playlist;
            });
    }

    onSubmit() {
        this.localStorage.setItem('tracks', JSON.stringify(this.tracks));
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 1000);
    }

    removeTrackFromPlaylist(playlistName, trackName) {
        let data = {
            playlistName: playlistName,
            trackName: trackName
        };

        this.getMusicService.removeTrackFromPlaylist(data)
            .subscribe(data => {
                console.log(data);
                this.playlists();
            });
    }
}
