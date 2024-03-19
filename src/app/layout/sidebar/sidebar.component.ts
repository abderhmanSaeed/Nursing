import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';
import { CONFIG } from '../../shared/configs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SideBarComponent {
   isShowDetails: boolean = true;

  isAuthenticated = this.authService.isAuth();

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {
      // debugger;
    }

    RemoveBodyClass(event:any){
        event.preventDefault();
        document.body.classList.remove("open-nav");
    }
  logout() {
    // Call the logout method from AuthService
    this.authService.logout();

    // Reset component variables
    this.isAuthenticated = false;
    this.router.navigate([CONFIG.auth.children.login.route.substring(1),]);
    window.location.reload();

  }
}
