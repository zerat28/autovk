import {Injectable} from '@angular/core';
import {BaseDataService} from "../core/services/basedataservice";
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Group} from "../models/group/group";

const methods = {
  my: 'groups',
  in_work: 'groups/in_work'
};

@Injectable()
export class GroupsService {


  groups: Observable<Array<Group>>;
  private _groups: BehaviorSubject<Array<Group>>;
  group: Observable<Group>;
  private _group: BehaviorSubject<Group>;

  dataStore: {
    groups: Array<Group>;
    group: Group;
  };

  fetching: {
    groups: boolean;
  };

  constructor(private dataService: BaseDataService) {
    this.dataStore = {groups: [], group: null};
    this._groups = <BehaviorSubject<Array<Group>>> new BehaviorSubject(this.dataStore.groups);
    this.groups = this._groups.asObservable();
    this._group = <BehaviorSubject<Group>> new BehaviorSubject(this.dataStore.group);
    this.group = this._group.asObservable();
    this.fetching = {groups: false};
  }


  /**
   * Проверка необходимости извлечения новых данных сообществ
   */
  awaitGroups() {
    if (this.dataStore.groups.length == 0 && !this.fetching.groups) {
      this.refreshGroups();
    }
    return this.groups;

  }

  /**
   * Получить данные о группах пользователя
   * @param params
   */

  refreshGroups() {
    this.fetching.groups = true;
    this.dataService.getData('', methods.my).subscribe(data => {
      this.dataStore.groups = [];
      data.forEach(g => {
        this.dataStore.groups.push(new Group().deserialize(g));
      });
      this._groups.next(this.dataStore.groups);
      this.fetching.groups = false;
    })
  }

  /**
   * Удалить группу по id(убрать из групп в работе)
   * @param id
   */
  delGroup(id) {
    this.dataService.delData(id, methods.my).subscribe(response => {
      if (response) {
        this.refreshGroups();
      }
    })
  }

  /**
   * Установка активного сообщества (управление которым осуществляется в данный момент)
   * @param id
   */
  setActiveGroup(group: Group) {
    this.dataStore.group = group;
    this._group.next(this.dataStore.group);
  }


}
