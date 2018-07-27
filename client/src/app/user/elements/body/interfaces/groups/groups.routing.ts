import {GroupsComponent} from "./groups.component";

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManagegroupComponent} from "./managegroup/managegroup.component";
import {QueuepostsComponent} from "./managegroup/sections/queueposts/queueposts.component";
import {MasspostsComponent} from "./managegroup/sections/massposts/massposts.component";
import {AddpostComponent} from "./managegroup/sections/addpost/addpost.component";
import {EditpostComponent} from "./managegroup/sections/editpost/editpost.component";

const groupsRoutes: Routes = [
  {path: '', component: GroupsComponent},
  {
    path: 'mg/:id', component: ManagegroupComponent, children:
    [
      {path: '', redirectTo: 'queue'},
      {path: 'queue', component: QueuepostsComponent},
      {path: 'posts', component: MasspostsComponent},
      {path: 'post', component: AddpostComponent},
      {path: 'editpost/:id', component: EditpostComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(groupsRoutes)],
  exports: [RouterModule]
})
export class GroupsRouting {
}
