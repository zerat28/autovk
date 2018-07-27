import {FormGroup} from "@angular/forms";;

export class Workerform {

  form: FormGroup;

  constructor(form) {
    this.form = form;
  }

  /**
   * Сброс формы
   */
  resetForm() {
    for (let key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        let value = Array.isArray(this.form.controls[key].value) ? [] : null;
        this.form.controls[key].patchValue(value);
      }
    }
  }

  /**
   * Заполнение формы
   * @param data
   */
  fillform(data) {
    for (let key in data) {
      if (this.form.controls.hasOwnProperty(key)) {
        this.form.controls[key].patchValue(data[key])
      }
    }
  }

  /**
   * disable/undisable формы
   * @param status - true/false
   */
  setFormState(status) {
    for (let key in this.form.controls) {
      status ? this.form.controls[key].enable() : this.form.controls[key].disable();
    }
  }

  /**
   * Установить значение поля формы
   * @param value
   * @param key
   */
  setValue(value, key) {
    this.form.controls[key].patchValue(value);
  }

  /**
   * Получить значение поля формы
   * @param key
   * @returns {any}
   */
  getFormValue(key) {
    return this.form.value[key];
  }
}
