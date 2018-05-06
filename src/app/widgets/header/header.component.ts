import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {GetMusicService} from '../../services/get-music.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    form: FormControl;
    inf: any;
    localStorage = localStorage;

    @Output() searchedTracks = new EventEmitter<any>();

    constructor(private userService: UserService,
                private  getMusicService: GetMusicService,
                private router: Router) {
    }

    ngOnInit() {
        this.form = new FormControl();
    }

    signOut() {
        this.userService.signOutUser()
            .subscribe(data => {
                this.inf = data;
                if (this.inf.status == 200) {
                    this.router.navigate(['/signIn']);
                    this.userService.logout();
                }
                console.log(this.inf);
            });
    }

    onSubmit() {
        this.getMusicService.searchTrackByName(this.form.value)
            .subscribe(data => {
                this.inf = JSON.parse(data);

                if (this.inf.status == 200) {
                    this.inf = this.inf.tracks.tracks.items;
                    this.localStorage.setItem('tracks', JSON.stringify(this.inf));
                    console.log(this.inf);
                    this.searchedTracks.emit(this.inf);

                } else if (this.inf.status == 401) {
                    this.router.navigate(['/signIn']);
                    this.userService.logout();
                }
            });
    }
}
