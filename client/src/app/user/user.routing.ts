import {UserComponent} from "./user.component";

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserGuard} from "./user.guard";

const userRoutes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {
        path: '',
        canActivate: [UserGuard],
        loadChildren: 'app/user/elements/body/interfaces/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'settings',
        loadChildren: 'app/user/elements/body/interfaces/settings/settings.module#SettingsModule',
      },
      {
        path: 'groups',
        canActivate: [UserGuard],
        loadChildren: 'app/user/elements/body/interfaces/groups/groups.module#GroupsModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
