import { Component } from '@angular/core';
import { LoginService } from '../../../../data/service/login/login.service';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { CONFIG } from '../../../../shared/configs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usernameOrMobile: string = '';
  password: string = '';
  constructor(private loginService: LoginService, private authService: AuthService,
    private router: Router,
  ) { }


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
            NameAr: response.Data.NameAr,
            NameEn: response.Data.NameEn,
            PhoneList: response.Data.PhoneList
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
}
