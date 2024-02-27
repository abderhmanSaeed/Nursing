import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONFIG } from '../../shared/configs';
import { ContactComponent } from './page/contact/contact.component';

const contactRoutes: Routes = [
  { path: '', component: ContactComponent },
];
@NgModule({
  imports: [RouterModule.forChild(contactRoutes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
