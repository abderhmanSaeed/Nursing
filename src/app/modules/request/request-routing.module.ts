import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONFIG } from '../../shared/configs';
import { RequestsComponent } from './page/requests/requests.component';
import { ManageRequestsComponent } from './page/manage-requests/manage-requests.component';

const requestsRoutes: Routes = [
  {
    path: '',
    redirectTo: CONFIG.request.children.requests.route,
    pathMatch: 'full'
  },
  { path: CONFIG.request.children.requests.route.substring(CONFIG.request.route.length + 1), component: ManageRequestsComponent },
  { path: CONFIG.request.children.myrequests.name , component: RequestsComponent },
  
  
];
@NgModule({
  imports: [RouterModule.forChild(requestsRoutes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
