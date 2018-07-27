/**
 * Компоненты
 */

import {UserComponent} from "./user.component";
import {LeftComponent} from "./elements/left/left.component";
import {TopComponent} from "./elements/top/top.component";
import {BodyComponent} from "./elements/body/body.component";

/**
 * Модули
 */
import {NgModule} from '@angular/core';
import {UserRoutingModule} from "./user.routing";
import {CommonModule} from '@angular/common';
import {UserGuard} from "./user.guard";

@NgModule({
  declarations: [
    UserComponent,
    LeftComponent,
    TopComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [
    UserGuard
  ]
})
export class UserModule {
}
