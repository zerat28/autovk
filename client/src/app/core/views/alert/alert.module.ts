/**
 * Компоненты
 */
import {AlertComponent} from "./alert.component";
/**
 * Модули
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [
    AlertComponent
  ]
})

export class AlertModule {
}
