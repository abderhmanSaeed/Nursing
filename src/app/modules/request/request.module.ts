import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestsComponent } from './page/requests/requests.component';
import { SharedModule } from '../../shared/shared.module';
import { ManageRequestsComponent } from './page/manage-requests/manage-requests.component';



@NgModule({
  declarations: [
    RequestsComponent,
    ManageRequestsComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule,

  ]
})
export class RequestModule { }
