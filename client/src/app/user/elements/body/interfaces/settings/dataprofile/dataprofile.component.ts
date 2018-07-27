import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {User} from "../../../../../../models/user/user";
import {Group} from "../../../../../../models/group/group";
import {GroupsService} from "../../../../../../services/groups.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-dataprofile',
  templateUrl: 'dataprofile.component.html'
})

export class DataprofileComponent implements OnInit, OnDestroy {

  @Input() user: User;
  subGroups: Subscription;
  groups: Array<Group>;

  constructor(private _gs: GroupsService) {
  }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.subGroups = this._gs.awaitGroups().subscribe(data => {
      this.groups = data;
    })
  }

  ngOnDestroy() {
    this.subGroups.unsubscribe();
  }

}
