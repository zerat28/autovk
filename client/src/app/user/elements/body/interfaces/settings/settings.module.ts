/**
 * Компоненты
 */
import {SettingsComponent} from "./settings.component";
import {DataprofileComponent} from "./dataprofile/dataprofile.component";
import {EditprofileComponent} from "./editprofile/editprofile.component";

/**
 * Модули
 */
import {SettingsRouting} from "./settings.routing";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../../../shared/modules/shared.module";

@NgModule({
  declarations: [
    SettingsComponent,
    DataprofileComponent,
    EditprofileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRouting
  ]
})

export class SettingsModule {
}
