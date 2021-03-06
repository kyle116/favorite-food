import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstName: String;
  lastName: String;
  age: String;
  favoriteFood: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSignupSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      favoriteFood: this.favoriteFood,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateSignup(user)) {
      this._flashMessagesService.show("Please fill in all fields", {cssClass: "alert-danger", timeout: 2000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this._flashMessagesService.show("Please use valid email", {cssClass: "alert-danger", timeout: 2000});
      return false;
    }

    // Create user
    this.authService.signupUser(user).subscribe(data => {
      if(data.success) {
        this.authService.authenticateUser(user).subscribe(loggedInData => {
          if(loggedInData.success) {
            this.authService.storeUserData(loggedInData.token, loggedInData.user);
            this._flashMessagesService.show("Signup Success! You are now logged in", {cssClass: "alert-success", timeout: 2000});
            this.router.navigate(["dashboard"]);
          } else {
            this._flashMessagesService.show(loggedInData.msg, {cssClass: "alert-danger", timeout: 2000});
            this.router.navigate(["login"]);
          }
        })
      } else {
        this._flashMessagesService.show("Something went wrong", {cssClass: "alert-danger", timeout: 2000});
        this.router.navigate(["/signup"]);
      }
    });

  }
}
