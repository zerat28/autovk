/**
 * Компоненты
 */
import {DatepickerComponent} from "./datepicker.component";
/**
 * Модули
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, OwlDateTimeIntl} from 'ng-pick-datetime';

/**
 * Локализация лейблов
 */
export class DefaultIntl {
  cancelBtnLabel = 'Отмена';
  setBtnLabel = 'Установить';
};


@NgModule({
  declarations: [
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'ru'},
    {provide: OwlDateTimeIntl, useClass: DefaultIntl}
  ],
  exports: [
    DatepickerComponent
  ]
})

export class DatepickerModule {
}
