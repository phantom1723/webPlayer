import {Component, Input, OnInit} from '@angular/core';
import {GetMusicService} from '../../services/get-music.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  playlists: any;
  playlistsClass: string = 'invisible';

  constructor(private getMusicService: GetMusicService) {
  }

  @Input() item: any;

  addToPlaylist(track, playlist) {
    let data1 = {
      playlistName: playlist,
      image: this.getImageUrl(track),
      trackName: track.name,
      artistName: this.getArtistsNames(track.artists),
      albumName: track.album.name,
      duration_ms: track.duration_ms,
      preview_url: track.preview_url || undefined
    };

    let data2 = {
      playlistName: 'default',
      image: this.getImageUrl(track),
      trackName: track.name,
      artistName: this.getArtistsNames(track.artists),
      albumName: track.album.name,
      duration_ms: track.duration_ms,
      preview_url: track.preview_url || 'empty'
    };

    this.getMusicService.addTrackToPlaylist(data1)
        .subscribe(data => {
          console.log(data);
          console.log(data1);
        });

    this.getMusicService.addTrackToPlaylist(data2)
        .subscribe();
  }

  showPlaylists() {
    console.log();
    this.getMusicService.getPlaylist()
        .subscribe(data => {
          this.playlists = Array.from(data.tracks.playlist);
        });

    this.playlistsClass = '';
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

  getImageUrl(data): string {
    if(data.images) {
      return data.images[1].url;
    } else if (data.image) {
      return data.image;
    } else { return data.album.images[1].url; }
  }

}
