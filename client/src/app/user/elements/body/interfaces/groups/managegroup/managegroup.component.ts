import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import {GroupsService} from "../../../../../../services/groups.service";
import {Group} from "../../../../../../models/group/group";
import {DictService} from "../../../../../../services/dict.service";

@Component({
  selector: 'app-mg',
  templateUrl: 'managegroup.component.html'
})

export class ManagegroupComponent implements OnInit, OnDestroy {

  subId: Subscription;
  id: number;
  subGroups: Subscription;
  groups: Array<Group>;
  subGroup: Subscription;
  is_active_group: boolean;


  constructor(private route: ActivatedRoute, private _gs: GroupsService, public dict:DictService) {
    this.is_active_group = false;
  }

  /**
   * Обработчик события инициализации компонента
   */
  ngOnInit() {
    this.getId();
    this.getActiveGroup();
    this.getGroups();
  }

  /**
   * Получить id сообщества из url
   */
  getId() {
    this.subId = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  /**
   * Получить выбранное сообщество
   */
  getGroups() {
    this.subGroups = this._gs.awaitGroups().subscribe(data => {
      this.groups = data;
      let activeGroup = this.groups.find(g => g.id == this.id);
      if (activeGroup) {
        this._gs.setActiveGroup(activeGroup);
      }
    })
  }

  /**
   * Подписка на получение активного(выбранного сообщества)
   */
  getActiveGroup() {
    this.subGroup = this._gs.group.subscribe(group => {
      this.is_active_group = group ? true : false;
    })
  }

  /**
   * Обработчик события уничтожения компонента
   */
  ngOnDestroy() {
    this.subId.unsubscribe();
    this.subGroup.unsubscribe();
    this.subGroups.unsubscribe();
    this._gs.setActiveGroup(null);
  }

}
