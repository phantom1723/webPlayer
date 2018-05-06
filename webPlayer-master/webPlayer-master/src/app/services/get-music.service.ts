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
    constructor(private http: HttpClient) {
    }

    searchTrackByName(trackName: string) {
        return this.http.get('http://localhost:8888/searchTrackByName:' + trackName, {responseType: 'text'});
    }

    searchTrackByArtistName(artistName: string) {
        return this.http.get('http://localhost:8888/searchTrackByName:' + artistName, {responseType: 'text'});
    }

    searchPlayList(playlistName: string) {
        return this.http.get('http://localhost:8888/searchTrackByName:' + playlistName, {responseType: 'text'});
    }

    createPlaylist(playlistName: string) {
        return this.http.get('http://localhost:8888/user/createPlaylist', {responseType: 'text'});
    }

}

