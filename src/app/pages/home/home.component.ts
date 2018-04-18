import {Component, Input, OnInit} from '@angular/core';
import {GetMusicService} from '../../services/get-music.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    newReleases: any;
    localStorage = localStorage;
    tracks: any;

    constructor(private getMusicService: GetMusicService) {}

    ngOnInit() {
        if(this.localStorage.getItem('tracks') != 'undefined') {
            this.tracks = JSON.parse(this.localStorage.getItem('tracks'));
        } else {
            this.getNewReleases();
        }
    }

    getNewReleases() {
        this.getMusicService.getNewReleases()
            .subscribe(data => {
                this.newReleases = JSON.parse(data);
                this.localStorage.setItem('tracks', JSON.stringify(this.newReleases.tracks.albums.items));
                this.tracks = this.newReleases;
                console.log(this.tracks);
            });
    }

    display(inf) {
        this.localStorage.setItem('tracks', JSON.stringify(inf));
        this.tracks = inf;
    }

    onClick(url) {
        if(url) {
            let audio = new Audio(url);
            audio.play();
        }
    }
}