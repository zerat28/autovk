import {Component, Input} from "@angular/core";
import {Control} from "../control";

@Component({
  selector: 'control-datepicker',
  templateUrl: 'datepicker.component.html'
})

export class DatepickerComponent extends Control {

  @Input() type: string;

  /**
   * Обработчик события изменения значения в контроле
   */
  onChange() {
    this.control.patchValue(this.control.value.toISOString());
  }

}
