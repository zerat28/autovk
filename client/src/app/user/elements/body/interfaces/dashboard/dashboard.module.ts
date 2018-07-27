/**
 * Компоненты
 */
import {DashboardComponent} from "./dashboard.component";

/**
 * Модули
 */
import {DashboardRouting} from "./dashboard.routing";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRouting
  ]
})

export class DashboardModule {
}
