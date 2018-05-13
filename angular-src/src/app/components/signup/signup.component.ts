import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(private validateService: ValidateService, private _flashMessagesService: FlashMessagesService) { }

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
      this._flashMessagesService.show("Please fill in all fields", {cssClass: "alert-danger", timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this._flashMessagesService.show("Please use valid email", {cssClass: "alert-danger", timeout: 3000});
      return false;
    }
  }
}
