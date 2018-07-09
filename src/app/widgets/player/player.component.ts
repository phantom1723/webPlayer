import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

import {GetMusicService} from '../../services/get-music.service';
import {PlaylistItem} from '../../pages/user/playlistsInterface';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

    playlists: PlaylistItem[];
    audios: any;
    sign: string = 'fa-play';
    isPlaying: boolean = false;
    route: string;

    constructor(private getMusicService: GetMusicService,
                private  router: Router) {
        this.route = this.router.url;
        this.showPlaylists();
    }

    @Input() item: any;
    @Input() i: number;

    addToPlaylist(track, playlist): void {
        let data1: Object = {
            playlistName: playlist,
            image: this.getImageUrl(track),
            trackName: track.name,
            artistName: this.getArtistsNames(track.artists),
            albumName: track.album.name,
            duration_ms: track.duration_ms,
            preview_url: track.preview_url || undefined
        };

        let data2: Object = {
            playlistName: 'default',
            image: this.getImageUrl(track),
            trackName: track.name,
            artistName: this.getArtistsNames(track.artists),
            albumName: track.album.name,
            duration_ms: track.duration_ms,
            preview_url: track.preview_url || 'empty'
        };

        this.getMusicService.addTrackToPlaylist(data1)
            .subscribe();

        this.getMusicService.addTrackToPlaylist(data2)
            .subscribe();
    }

    showPlaylists(): void {
        this.getMusicService.getPlaylist()
            .subscribe((data: any) => {
                this.playlists = Array.from(data.tracks.playlist);
            });
    }

    getArtistsNames(data): string {
        let artists: string = data[0].name;

        if (data.length == 1) {
            artists = data[0].name;
            return artists;
        } else {
            for (let i = 1; i < data.length; i++) {
                artists = artists + ' & ' + data[i].name;
            }
            return artists;
        }
    }

    getImageUrl(data): string {
        if (data.images) {
            return data.images[1].url;
        } else if (data.image) {
            return data.image;
        } else {
            return data.album.images[1].url;
        }
    }

    stopAllSongs(): void {
        let musicSigns = document.querySelectorAll('.music-sign');

        for (let i = 0; i < this.audios.length; i++) {
            this.audios[i].pause();
            this.audios[i].currentTime = 0.0;
        }

        for (let i = 0; i < musicSigns.length; i++) {
            if (musicSigns[i].classList.contains('fa-pause')) {
                musicSigns[i].classList.remove('fa-pause');
                musicSigns[i].classList.add('fa-play');
            }
        }
    }

    play(index): void {
        this.audios = document.querySelectorAll('audio');
        if (this.audios[index].attributes[1].nodeValue) {
            this.stopAllSongs();
            if (this.isPlaying) {
                this.audios[index].pause();
                this.sign = 'fa-play';
                this.isPlaying = false;
            }
            else if (!this.isPlaying) {
                this.audios[index].play();
                this.sign = 'fa-pause';
                this.isPlaying = true;
            }
        }
    }

    playNext(index): void {
        this.play(index + 1);
    }

    playPrevious(index): void {
        this.play(index - 1);
    }
}