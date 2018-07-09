import { Component, OnInit } from '@angular/core';
import { GetMusicService } from '../../services/get-music.service';
import { Router } from "@angular/router";
import { NewReleasesItem } from './tracksInterface'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    newReleases: NewReleasesItem[];
    localStorage = localStorage;
    tracks: any;

    constructor(private getMusicService: GetMusicService,
                private  router: Router) {
    }

    ngOnInit() {
        if (!this.localStorage.getItem('tracks') || this.localStorage.getItem('tracks') == 'undefined') {
            this.getNewReleases();
        } else if (this.localStorage.getItem('tracks') != 'undefined') {
            this.tracks = JSON.parse(this.localStorage.getItem('tracks'));
            this.tracks = Array.from(this.tracks);
        }

        if( document.cookie.indexOf('token')) {
            this.localStorage.setItem('isAuth', 'true');
        }

        if (!this.localStorage.getItem('isAuth')) {
            this.router.navigate(['/signIn']);
        }
    }

    getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined

}

    getNewReleases() {
        this.getMusicService.getNewReleases()
            .subscribe(data => {
                this.newReleases = JSON.parse(data).tracks.albums.items;
                this.localStorage.setItem('tracks', JSON.stringify(this.newReleases));
                this.tracks = Array.from(this.newReleases);
            });
    }

    display(inf) {
        this.localStorage.setItem('tracks', JSON.stringify(inf));
        this.tracks = Array.from(inf);
    }
}