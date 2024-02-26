import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';
import { CONFIG } from '../../shared/configs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
   isShowDetails: boolean = true;

  isAuthenticated = this.authService.isAuth();

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  logout() {
    // Call the logout method from AuthService
    this.authService.logout();

    // Reset component variables
    this.isAuthenticated = false;
    this.router.navigate([CONFIG.auth.children.login.route.substring(1),]);
    window.location.reload();

  }
}
