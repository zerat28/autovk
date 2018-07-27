import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../../models/user/user";
import {UserService} from "../../../services/user.service";
import {DictService} from "../../../services/dict.service";

@Component({
  selector: 'app-left',
  templateUrl: 'left.component.html'
})

export class LeftComponent implements OnInit, OnDestroy {

  subUser: Subscription;
  user: User;

  constructor(private _us: UserService, public dict:DictService) {
  }

  /**
   * Обработчик события инициализации компонента
   */
  ngOnInit() {
    this.getUser();
  }

  /**
   * Получить пользователя
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
    this.subUser.unsubscribe();
  }

}
