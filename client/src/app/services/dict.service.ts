/**
 * Сервис для доступа к словарям
 */

import {DictHeaders} from "../shared/dictionaries/headers";

import {Injectable} from '@angular/core';

@Injectable()

export class DictService {

  headers: DictHeaders;

  constructor() {
    this.headers = new DictHeaders();
  }

}
