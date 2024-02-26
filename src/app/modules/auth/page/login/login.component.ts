import { Component } from '@angular/core';
import { LoginService } from '../../../../data/service/login/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usernameOrMobile: string = '';
  password: string = '';
  constructor(private loginService: LoginService) { }

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
          // Handle successful login, navigate to dashboard, etc.
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
}
