import { Component, OnInit } from '@angular/core';
import {GetMusicService, RequestedDataInterface} from '../../services/get-music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inf: RequestedDataInterface;


  constructor(private getMusicService: GetMusicService) {
    this.showData();

  }

showData() {
    this.getMusicService.getData()
        .subscribe(data => {
          this.inf = data;
        });

  };

  show() {

  }



  playAudio(i) {
/*
    var audio = new Audio(this.inf.aTracks[0].track_listen_url);

    audio.play();*/
    console.log('work');
  }

  ngOnInit() {
  }


}
