import {Injectable} from '@angular/core';
import {BaseDataService} from "../core/services/basedataservice";
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Token} from "../models/token/token";

const methods = {
  token: 'token'
};

@Injectable()
export class TokenService {

  token: Observable<Token>;
  private _token: BehaviorSubject<Token>;

  dataStore: {
    token: Token;
  };

  fetching: {
    token: boolean;
  };

  constructor(private dataService: BaseDataService) {
    this.dataStore = {token: null};
    this._token = <BehaviorSubject<Token>> new BehaviorSubject(this.dataStore.token);
    this.token = this._token.asObservable();
    this.fetching = {token: false};
  }


  /**
   * Проверка необходимости получения нового токена
   */
  awaitToken() {
    if (this.dataStore.token == null && !this.fetching.token) {
      this.refreshToken();
    }
    return this.token;

  }

  /**
   * Получение токена
   */
  refreshToken() {
    this.fetching.token = true;
    this.dataService.getData('', methods.token).subscribe(data => {
      this.dataStore.token = new Token().deserialize(data);
      this.dataService.token = this.dataStore.token;
      this._token.next(this.dataStore.token);
      this.fetching.token = false;
    })
  }
}
