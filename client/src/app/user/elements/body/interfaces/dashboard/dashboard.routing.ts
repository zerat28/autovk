import {DashboardComponent} from "./dashboard.component";

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const dashRoutes: Routes = [
  {path: '', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(dashRoutes)],
  exports: [RouterModule]
})
export class DashboardRouting {
}
