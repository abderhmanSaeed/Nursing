import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONFIG } from '../../shared/configs';
import { UsersComponent } from './page/users/users.component';

const usersRoutes: Routes = [
  {
    path: '',
    redirectTo: CONFIG.user.children.users.route,
    pathMatch: 'full'
  },
  { path: CONFIG.user.children.users.route.substring(CONFIG.user.route.length + 1), component: UsersComponent },
];
@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
