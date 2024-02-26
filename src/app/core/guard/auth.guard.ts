import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { CONFIG } from '../../shared/configs';

@Injectable({
  providedIn: 'root' // This ensures your service is a singleton and available throughout the app
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();

    if (token) {
      // If token exists, user is authenticated, allow route activation
      return true;
    } else {
      // If no token, redirect to login page or deny access
      this.router.navigate([CONFIG.auth.children.login.route.substring(1),]);
      return false;
    }
  }
}
