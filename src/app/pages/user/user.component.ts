import {Component, HostListener, OnInit} from '@angular/core';

import {UserModule} from './user.module';
import {FormControl} from "@angular/forms";
import {GetMusicService} from "../../services/get-music.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {PlaylistItem} from "./playlistsInterface"

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    isAuth: boolean;
    form: FormControl;
    playlist: PlaylistItem[];

    constructor(private  userModule: UserModule,
                private  getMusicService: GetMusicService,
                private userService: UserService,
                private  router: Router) {
        this.playlists();
    }

    signOut(): void {
        this.userService.signOutUser()
            .subscribe((data: any) => {
                if (data.status == 200) {
                    this.router.navigate(['/signIn']);
                    this.userService.logout();
                }
            });
    }

    ngOnInit() {
        this.userModule.checkUser();
        this.form = new FormControl();
    }

    createPlaylist(): void {
        this.getMusicService.createPlaylist(this.form.value)
            .subscribe(() => {
                this.playlists();
            });
    }

    playlists(): void {
        this.getMusicService.getPlaylist()
            .subscribe((data: any) => {
                this.playlist = data.tracks.playlist;
            });
    }

    findTracks(): void {
        setTimeout(() => {
            this.router.navigate(['/']);
        }, 1000);
    }

    removeTrackFromPlaylist(playlistName, trackName): void {
        let data = {
            playlistName: playlistName,
            trackName: trackName
        };

        this.getMusicService.removeTrackFromPlaylist(data)
            .subscribe(() => {
                this.playlists();
            });
    }

}
