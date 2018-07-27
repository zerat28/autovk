import {OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Group} from "../../../../../../../../models/group/group";
import {GroupsService} from "../../../../../../../../services/groups.service";

export class Basesectiongroup implements OnInit, OnDestroy {

  subGroup: Subscription;
  group: Group;
  alert: any;

  constructor(private _gs: GroupsService) {
  }

  ngOnInit() {
    this.getActiverGroup();
  }

  getActiverGroup() {
    this.subGroup = this._gs.group.subscribe(group => {
      this.group = group;
    })
  }

  /**
   * Сброс сообщения о статусе операции
   */
  resetAlert(){
    this.alert = null;
  }

  ngOnDestroy() {
    this.subGroup.unsubscribe();
  }

}
