import {SettingsComponent} from "./settings.component";

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const setRoutes: Routes = [
  {path: '', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(setRoutes)],
  exports: [RouterModule]
})
export class SettingsRouting {
}
