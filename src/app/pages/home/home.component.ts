import {Component, OnInit} from '@angular/core';
import {GetMusicService} from '../../services/get-music.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    inf: any;

    constructor(private getMusicService: GetMusicService) {
    }

    listen() {
        this.getMusicService.searchTrackByName('numb')
            .subscribe(data => {
                this.inf = JSON.parse(data);
                console.log(this.inf.tracks.tracks.items[1]);
            });
    }


    ngOnInit() {
    }


}
