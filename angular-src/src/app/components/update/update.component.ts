import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  user = {
    firstName: "",
    lastName: "",
    age: "",
    favoriteFood: "",
    email: ""
  };

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onUpdateSubmit() {
    // Required Fields
    if(!this.validateService.validateSignup(this.user)) {
      this._flashMessagesService.show("Please fill in all fields", {cssClass: "alert-danger", timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(this.user.email)) {
      this._flashMessagesService.show("Please use valid email", {cssClass: "alert-danger", timeout: 3000});
      return false;
    }

    // Update user
    this.authService.updateUser(this.user).subscribe(data => {
      if(data.success) {
        this._flashMessagesService.show("Update Success!", {cssClass: "alert-success", timeout: 3000});
        this.router.navigate(["/profile"]);
      } else {
        this._flashMessagesService.show("Something went wrong", {cssClass: "alert-danger", timeout: 3000});
        this.router.navigate(["/update"]);
      }
    });
  }

}
