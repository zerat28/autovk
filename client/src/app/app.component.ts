import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Token} from "./models/token/token";
import {TokenService} from "./services/token.service";
import {UserService} from "./services/user.service";
import {User} from "./models/user/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  subToken: Subscription;
  token: Token;
  subUser: Subscription;
  user: User;

  constructor(private _ts: TokenService, private _us:UserService) {
  }

  /**
   * Обработчик события инициплизации компонента
   */
  ngOnInit() {
    this.getToken();
    this.getUser();
  }

  /**
   * Получение токена
   */
  getToken() {
    this.subToken = this._ts.awaitToken().subscribe(token => {
      this.token = token;
    })
  }

  /**
   * Получение пользователя
   */
  getUser() {
    this.subUser = this._us.awaitUser().subscribe(user => {
      this.user = user;
    })
  }

  /**
   * Обработчик события уничтожения компонента
   */
  ngOnDestroy() {
    this.subToken.unsubscribe();
    this.subUser.unsubscribe();
  }

}
