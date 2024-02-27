import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONFIG } from '../../shared/configs';
import { AboutComponent } from './page/about/about.component';

const aboutRoutes: Routes = [
  { path: '', component: AboutComponent },
];
@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
