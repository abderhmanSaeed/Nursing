import { Component } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  constructor() { }

  onLogin() {
    // Implement your login logic here
    // For example, validate input and make an API call to your backend
    console.log('Login action');
  }
}
