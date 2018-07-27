import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {UserService} from "../services/user.service";

/**
 * "Защитник" - Проверка синхронизирован ли пользователь с вк
 */

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private _us: UserService, private route: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this._us.isUserSync()) {
      this.route.navigate(['./settings']);
    }
    return this._us.isUserSync()
  }
}
