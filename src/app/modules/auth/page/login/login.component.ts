import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../data/service/login/login.service';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { CONFIG } from '../../../../shared/configs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usernameOrMobile: string = '';
  password: string = '';
  constructor(private loginService: LoginService, private authService: AuthService,
    private router: Router,
  ) {
    this.updateMessage();
  }
  ngOnInit(): void {
    // Get the authentication token from the AuthService
    const token = this.authService.getToken();
    if(token){

    }

  }


  handleNameChange(event: any) {
    this.usernameOrMobile = event;
  }
  handlePasswordChange(event: any) {
    this.password = event;
  }

  handleLogin() {
    // Perform login action here with this.usernameOrMobile and this.password
    // Assuming usernameOrMobile is an email for simplicity, or add logic to determine if it's a username or mobile
    const email = this.usernameOrMobile;
    const password = this.password;

    this.loginService.signIn(email, password).subscribe({
      next: (response) => {
        if (response.Success) {
          console.log('Login Success:', response.Data);
          console.log('Login Success:', response.Data);
          // Extract the token from the response and save it
          this.authService.setToken(response.Data.Token);
          localStorage.setItem('user_info', JSON.stringify({
            FullName: response.Data.FullName,
            Roles: response.Data.Roles,
            PhoneList: response.Data.Phones
          }));
          // Handle successful login, e.g., navigate to the dashboard
          this.router.navigate([CONFIG.dashboard.name]); // Assuming you have routing set up
        } else {
          console.error('Login Failed:', response.Message);
          // Handle login failure, show error message, etc.
        }
      },
      error: (error) => {
        console.error('API Error:', error);
        // Handle HTTP errors here
      }
    });
  }


  // Using var
  varVariable: string = 'Hello, var!';

  updateMessageVar() {
    var varVariable = 'Updated var!';
    this.message = varVariable;
  }

  // Using let
  letVariable: string = 'Hello, let!';

  updateMessageLet() {
    let letVariable = 'Updated let!';
    this.message = letVariable;
  }

  // Using const
  constVariable: string = 'Hello, const!';

  updateMessageConst() {
    // constVariable = 'Updated const!'; // Error: Cannot assign to 'constVariable' because it is a constant.
    this.message = this.constVariable;
  }
  message: string = this.varVariable;

  updateMessage() {
    console.log(this.message);
    this.updateMessageVar();
    // this.updateMessageLet();
    // this.updateMessageConst();
  }
}
