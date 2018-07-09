import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-recovery',
    templateUrl: './recovery.component.html',
    styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
    recovery: FormControl;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.recovery = new FormControl();
    }

    onSubmit() {
        this.userService.recoveryPwd(this.recovery.value)
            .subscribe(data => console.log(data));
    }
}
