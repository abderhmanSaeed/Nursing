import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../../data/service/auth/auth.service';

@Injectable({
  providedIn: 'root' // This ensures your service is a singleton and available throughout the app
})
export class AuthGuard implements CanActivate {

  // constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return true;
  }
  // canActivate(): boolean {
  //   const token = this.authService.getToken();

  //   if (token) {
  //     // If token exists, user is authenticated, allow route activation
  //     return true;
  //   } else {
  //     // If no token, redirect to login page or deny access
  //     this.router.navigate(['/product/productOrders']); // Adjust the route as necessary
  //     return false;
  //   }
  // }
}
