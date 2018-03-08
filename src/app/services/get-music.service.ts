import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getData() {
    return this.http.get<RequestedDataInterface>('https://freemusicarchive.org/recent.json');
  }
}

