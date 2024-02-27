import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONFIG } from '../../shared/configs';
import { HomeComponent } from './page/home/home.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: CONFIG.dashboard.children.home.route,
    pathMatch: 'full'
  },
  { path: CONFIG.dashboard.children.home.route.substring(CONFIG.dashboard.route.length + 1), component: HomeComponent },
];
@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
