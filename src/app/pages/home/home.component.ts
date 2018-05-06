import {Component, Input, OnInit} from '@angular/core';
import {GetMusicService} from '../../services/get-music.service';
import {Router} from "@angular/router";
import { PlayerComponent } from '../../widgets/player/player.component'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    newReleases: any;
    localStorage = localStorage;
    tracks: any;
    playlists: any;
    playlistsClass: string = 'invisible';

    constructor(private getMusicService: GetMusicService,
                private  router: Router) {
    }

    ngOnInit() {

        if ( !this.localStorage.getItem('tracks') || this.localStorage.getItem('tracks') == 'undefined') {
            this.getNewReleases();
        } else if (this.localStorage.getItem('tracks') != 'undefined') {
            this.tracks = JSON.parse(this.localStorage.getItem('tracks'));
            this.tracks = Array.from(this.tracks);
            console.log(this.tracks);

        }

        if (!this.localStorage.getItem('isAuth')) {
            this.router.navigate(['/signIn']);
        }
    }

    getNewReleases() {
        this.getMusicService.getNewReleases()
            .subscribe(data => {
                this.newReleases = JSON.parse(data);
                this.localStorage.setItem('tracks', JSON.stringify(this.newReleases.tracks.albums.items));
                this.tracks = Array.from(this.newReleases.tracks.albums.items);
                console.log(this.tracks);
            });
    }

    display(inf) {
        this.localStorage.setItem('tracks', JSON.stringify(inf));
        this.tracks = Array.from(inf);
    }

    onClick(url) {
        if (url) {

            let audio = new Audio(url);
            audio.play();
        }
    }



    getArtistsNames(data): string {
        let artists: string = data[0].name;

        if(data.length == 1) {
            artists = data[0].name;
            return artists;
        } else {
            for(let i = 1; i < data.length; i++) {
                artists = artists + ' & ' + data[i].name;
            }
            return artists;
        }

    }


}

/*

/createPlaylist ////playlistName
/addTrackToPlaylist ////playlistName ,tracksName ,artistName,albumName,duration_ms,preview_url
/removeTrackFromPlaylist ///playlistName,trackName*/
