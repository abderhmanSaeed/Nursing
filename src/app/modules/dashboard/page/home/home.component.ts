import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { config } from 'process';
import { CONFIG } from '../../../../shared/configs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userPageRoute = CONFIG.user.route.substring(1);
  requestPageRoute = CONFIG.request.route.substring(1);

  constructor(private router: Router) { }

  GoTo(route:string):void{
    this.router.navigate([route]);
  }

}
