/**
 * Компоненты
 */
import {InputfileComponent} from "./inputfile.component";
/**
 * Модули
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    InputfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    InputfileComponent
  ]
})

export class InputfileModule {
}
