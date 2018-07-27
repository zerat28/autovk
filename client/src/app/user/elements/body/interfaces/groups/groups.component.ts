import {Component, OnDestroy, OnInit} from "@angular/core";
import {GroupsService} from "../../../../../services/groups.service";
import {Subscription} from "rxjs/Subscription";
import {Group} from "../../../../../models/group/group";

@Component({
  selector: 'app-groups',
  templateUrl: 'groups.component.html'
})

export class GroupsComponent implements OnInit, OnDestroy {

  subGroups: Subscription;
  groups: Array<Group>;

  constructor(private _gs: GroupsService) {
  }

  /**
   * Обработчик события инициализации компонента
   */
  ngOnInit() {
    this.getGroups();
  }

  /**
   * Получить сообщества
   */
  getGroups() {
    this.subGroups = this._gs.awaitGroups().subscribe(data => {
      this.groups = data;
    })
  }

  /**
   * Обработчик события уничтожения компонента
   */
  ngOnDestroy() {
    this.subGroups.unsubscribe();
  }

}
