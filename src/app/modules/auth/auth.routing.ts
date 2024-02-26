import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { CONFIG } from '../../shared/configs';
import { AuthLayoutComponent } from '../../layout/auth-layout/auth-layout.component';

// const authRoutes: Routes = [
//   { path: CONFIG.auth.children.login.route.substring(CONFIG.auth.route.length + 1), component: LoginComponent },
//   { path: CONFIG.auth.children.register.route.substring(CONFIG.auth.route.length + 1), component: RegisterComponent },
// ];

const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: CONFIG.auth.children.login.route.substring(CONFIG.auth.route.length + 1), component: LoginComponent },
      { path: CONFIG.auth.children.register.route.substring(CONFIG.auth.route.length + 1), component: RegisterComponent },
      // Add more auth-related routes here
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
