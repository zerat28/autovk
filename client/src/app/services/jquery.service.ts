/**
 * Сервис для доступа к jquery функциям
 */
import {Injectable} from '@angular/core';

declare var jquery: any;
declare var $: any;

@Injectable()

export class JqueryService {

  InitTemplate() {

  }

  activateSelect2() {
    setTimeout(function () {
      $('#select2').select2();
    });
  }

}
