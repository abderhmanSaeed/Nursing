import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    // document.body.style.background = "url('../../../assets/images/auth-bg.jpg') no-repeat center/cover";
    document.body.classList.add('auth-pages');
  }


}
