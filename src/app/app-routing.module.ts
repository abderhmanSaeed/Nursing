import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONFIG } from './shared/configs';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: CONFIG.auth.children.login.route.substring(1),
    pathMatch: 'full'
  },
  {
    path: CONFIG.auth.route.substring(1),
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: CONFIG.dashboard.route.substring(1),
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: CONFIG.about.route.substring(1),
        loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
      },
      {
        path: CONFIG.contact.route.substring(1),
        loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: CONFIG.user.route.substring(1),
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: CONFIG.request.route.substring(1),
        loadChildren: () => import('./modules/request/request.module').then(m => m.RequestModule)
      }
    ]
  },
  // Redirect to 'auth/login' as a fallback for any unknown routes
  {
    path: '**',
    redirectTo: CONFIG.auth.children.login.route.substring(1)
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
