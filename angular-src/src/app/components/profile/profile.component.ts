import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  userId: String;
  currentUserId: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params["id"];
    });

    this.authService.getProfile(false).subscribe(profile => {
      this.currentUserId = profile.user._id;
    })

    this.authService.getProfile(this.userId).subscribe(profile => {
      this.user = profile.user;
      this.userId = profile.user._id
    },
    err => {
      console.log(err);
      return false;
    });

  }

  deleteUser(id) {
    this.authService.logout();
    this.authService.deleteUser(id).subscribe(data => {
      if(data.success) {
        this._flashMessagesService.show("Your account has been deleted", {cssClass: "alert-success", timeout: 2000});
        this.router.navigate(["/"]);
      } else {
        this._flashMessagesService.show("Something went wrong", {cssClass: "alert-danger", timeout: 2000});
      }
    })
  }

}
