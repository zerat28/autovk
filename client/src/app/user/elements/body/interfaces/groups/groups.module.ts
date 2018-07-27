/**
 * Компоненты
 */
import {GroupsComponent} from "./groups.component";
import {WorkgroupsComponent} from "./workgroups/workgroups.component";
import {ManagegroupComponent} from "./managegroup/managegroup.component";
import {QueuepostsComponent} from "./managegroup/sections/queueposts/queueposts.component";
import {MasspostsComponent} from "./managegroup/sections/massposts/massposts.component";
import {AddpostComponent} from "./managegroup/sections/addpost/addpost.component";
import {PostfilterComponent} from "./managegroup/sections/queueposts/postsfilter/postfilter.component";
import {EditpostComponent} from "./managegroup/sections/editpost/editpost.component";

/**
 * Модули
 */
import {GroupsRouting} from "./groups.routing";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../../../shared/modules/shared.module";

@NgModule({
  declarations: [
    GroupsComponent,
    WorkgroupsComponent,
    ManagegroupComponent,
    QueuepostsComponent,
    MasspostsComponent,
    AddpostComponent,
    PostfilterComponent,
    EditpostComponent
  ],
  imports: [
    CommonModule,
    GroupsRouting,
    SharedModule
  ]
})

export class GroupsModule {
}
