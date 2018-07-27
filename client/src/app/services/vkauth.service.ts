import {Injectable} from '@angular/core';
import {BaseDataService} from "../core/services/basedataservice";
import {Observable, BehaviorSubject} from 'rxjs/Rx';

const methods = {
  link: 'vk/link',
  linkgroup: 'vk/linkgroup',
  access_token: 'vk/token'
};

@Injectable()
export class VkauthService {


  link: Observable<string>;
  private _link: BehaviorSubject<string>;

  linkgroup: Observable<string>;
  private _linkgroup: BehaviorSubject<string>;


  dataStore: {
    link: string;
    linkgroup: string;
  };

  fetching: {
    link: boolean;
    linkgroup: boolean;
  };

  constructor(private dataService: BaseDataService) {
    this.dataStore = {link: null, linkgroup: null};
    this._link = <BehaviorSubject<string>> new BehaviorSubject(this.dataStore.link);
    this.link = this._link.asObservable();
    this._linkgroup = <BehaviorSubject<string>> new BehaviorSubject(this.dataStore.linkgroup);
    this.linkgroup = this._linkgroup.asObservable();
    this.fetching = {link: false, linkgroup: false};
  }


  /**
   * Проверка необходимости извлечения новых данных для ссылки авторизации
   */
  awaitLink() {
    if (this.dataStore.link == null && !this.fetching.link) {
      this.refreshLink();
    }
    return this.link;

  }

  /**
   * Получить ссылку авторизации
   * @param params
   */

  refreshLink() {
    this.fetching.link = true;
    this.dataService.getData('', methods.link).subscribe(data => {
      this.dataStore.link = data;
      this._link.next(this.dataStore.link);
      this.fetching.link = false;
    });
  }

  /**
   * Получить ссылку для получения доступа к сообществу
   * @param params
   */

  getLinkGroup(params): Observable<any> {
    return this.dataService.getData(params, methods.linkgroup)

  }

  /**
   * Установить токен доступа к вк
   * @param params
   * @returns {Observable<any>}
   */
  setToken(params):Observable<any> {
    return this.dataService.addData(params,methods.access_token);
  }
}
