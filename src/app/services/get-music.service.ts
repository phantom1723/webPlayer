import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface RequestedDataInterface {
    aTracks: string,
    trackId: number,
    trackTitle: string,
    artistId: number,
    track_listen_url: string
}

@Injectable()
export class GetMusicService {
    wasSearched: boolean = false;
    data: any;

    constructor(private http: HttpClient) {
    }

    searchTrackByName(trackName: string) {
        this.wasSearched = true;
        return this.http.get('http://localhost:8888/user/searchTrackByName?name=' + trackName, {responseType: 'text'});
    }

    searchTrackByArtistName(artistName: string) {
        return this.http.get('http://localhost:8888/user/searchTrackByArtistName?name=' + artistName, {responseType: 'text'});
    }

    searchPlayList(playlistName: string) {
        return this.http.get('http://localhost:8888/searchTrackByName:' + playlistName, {responseType: 'text'});
    }

    createPlaylist(playlistName: string) {
        let data = {playlistName: playlistName};
        return this.http.post('http://localhost:8888/user/createPlaylist', data, {responseType: 'text'});
    }

    getNewReleases() {
        return this.http.get('http://localhost:8888/user/getNewReleases', {responseType: 'text'});
    }

    getPlaylist() {
        return this.http.get('http://localhost:8888/user/home', {responseType: 'text'});

    }

}

