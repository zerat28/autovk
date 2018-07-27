/**
 * Компоненты
 */
import {SelectComponent} from "./select.component";
/**
 * Модули
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    SelectComponent
  ]
})

export class SelectModule {
}
