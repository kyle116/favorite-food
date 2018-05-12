import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
