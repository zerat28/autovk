/**
 * Модуль, расширивающий библиотеки
 */
import {NgModule} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SelectModule} from "../../core/controls/select/select.module";
import {TextareaModule} from "../../core/controls/textarea/textarea.module";
import {DatepickerModule} from "../../core/controls/datepicker/datepicker.module";
import {InputfileModule} from "../../core/controls/inputfile/inputfile.module";

import {AlertModule} from "../../core/views/alert/alert.module";

import {OrderByPipe} from "../../core/pipes/orderBy.pipe";

@NgModule({
  declarations: [
    OrderByPipe
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    TextareaModule,
    DatepickerModule,
    InputfileModule,
    AlertModule,
    OrderByPipe

  ]
})
export class SharedModule {
}
