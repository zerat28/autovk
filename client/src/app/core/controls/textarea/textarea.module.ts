/**
 * Компоненты
 */
import {TextareaComponent} from "./textarea.component";
/**
 * Модули
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    TextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    TextareaComponent
  ]
})

export class TextareaModule {
}
