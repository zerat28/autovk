import {Injectable} from '@angular/core';
import {BaseDataService} from "../core/services/basedataservice";
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {User} from "../models/user/user";

const methods = {
  user: 'user'
};

@Injectable()
export class UserService {


  user: Observable<User>;
  private _user: BehaviorSubject<User>;


  dataStore: {
    user: User;
  };

  fetching: {
    user: boolean;
  };

  constructor(private dataService: BaseDataService) {
    this.dataStore = {user: null};
    this._user = <BehaviorSubject<User>> new BehaviorSubject(this.dataStore.user);
    this.user = this._user.asObservable();
    this.fetching = {user: false};
  }


  /**
   * Проверка необходимости извлечения новых данных текущего пользователя
   */
  awaitUser() {
    if (this.dataStore.user == null && !this.fetching.user) {
      this.refreshUser();
    }
    return this.user;

  }

  /**
   * Получить данные о текущем пользователе
   * @param params
   */

  refreshUser() {
    this.fetching.user = true;
    this.dataService.getData('', methods.user).subscribe(data => {
      this.dataStore.user = new User().deserialize(data);
      this._user.next(this.dataStore.user);
      this.fetching.user = false;
    })
  }

  /**
   * Обновить данные текущего пользователя
   * @param params
   */
  updUser(params): Observable<any> {
    return this.dataService.updData(params, methods.user);
  }

  /**
   * Проверка, синхронизирован ли пользователь с ВК
   */
  isUserSync(): boolean {
    if (!this.dataStore.user) {
      return false;
    }
    return this.dataStore.user.is_sync;
  }

}
