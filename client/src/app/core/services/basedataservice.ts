import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Config} from "../../app.config";
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Token} from "../../models/token/token";

@Injectable()
export class BaseDataService {

  /**
   * Адрес запроса
   */
  private url: string;
  /**
   * Параметры запроса
   */
  private params: any;

  /**
   * csrf
   */
  token: Token;

  constructor(private http: HttpClient) {
    this.baseUrl();
  }


  /**
   * get запрос на получение данных
   */
  getRequest(): Observable<any> {
    const httpOptions = {
      params: this.generateParams(this.params)
    };


    return this.http
      .get(this.url, httpOptions);
  }

  /**
   * post запрос на добавление данных
   */
  postRequest(): Observable<any> {
    let headers = this.generateHeaders();
    headers = headers.delete('Content-Type');
    const httpOptions = {
      headers: headers
    };
    return this.http
      .post(this.url, this.params, httpOptions);
  }

  /**
   * put запрос на обновление данных
   */
  putRequest(): Observable<any> {
    const httpOptions = {
      headers: this.generateHeaders()
    };
    return this.http
      .put(this.url, JSON.stringify(this.params), httpOptions);
  }

  /**
   * delete запрос на удаление данных
   */
  delRequest(): Observable<any> {
    const httpOptions = {
      headers: this.generateHeaders(),
    };
    return this.http
      .delete(this.url + '/' + this.params, httpOptions);
  }


  /**
   * Подготовка запроса: установка url и параметров
   * @param {string} url
   * @param params
   */
  prepareRequest(url: string, params: any) {
    this.baseUrl();
    this.setUrl(this.getUrl() + url);
    this.setParams(params);
  }


  /**
   * Установить параметры запроса
   * @param params
   */
  setParams(params) {
    this.params = params;
  }

  /**
   * Установить url
   * @param url
   */
  setUrl(url) {
    this.url = url;
  }

  /**
   * Получить url
   * @returns {string}
   */
  getUrl() {
    return this.url;
  }

  /**
   * Обнуление url до дефолтного из конфига
   */
  baseUrl() {
    this.setUrl(Config.remoteUrl);
    this.params = false;
  }

  /**
   * Формирование heder-ов
   */
  generateHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': this.token.value
    });
    return headers;
  }

  /**
   * Формирование параметров
   */
  generateParams(params) {
    let filterparams = {};
    for (let key in params) {
      if (params[key]) {
        filterparams[key] = params[key];
      }
    }
    return filterparams;
  }


  /**
   * Получить данные
   * @param params - параметры запроса
   * @param method - метод
   * @returns {Observable<any>} - объект результата
   */
  getData(params, method): Observable<any> {
    this.prepareRequest(method, params);
    return this.getRequest();
  }


  /**
   * Добавить данные
   * @param params
   * @param method
   * @returns {Observable<any>}
   */
  addData(params, method): Observable<any> {
    this.prepareRequest(method, params);
    return this.postRequest();
  }

  /**
   * Обновить данные
   * @param params
   * @param method
   * @returns {Observable<any>}
   */
  updData(params, method): Observable<any> {
    this.prepareRequest(method, params);
    return this.putRequest();
  }

  /**
   * Удалить данные
   * @param params
   * @param method
   * @returns {Observable<any>}
   */
  delData(params, method): Observable<any> {
    this.prepareRequest(method, params);
    return this.delRequest();
  }


}
