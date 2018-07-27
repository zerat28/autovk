import {Component, Input} from "@angular/core";
import {Group} from "../../../../../../models/group/group";
import {Router} from "@angular/router";

@Component({
  selector: 'app-workgroups',
  templateUrl: 'workgroups.component.html'
})

export class WorkgroupsComponent {

  @Input() groups: Array<Group>;

  constructor(private router: Router) {
  }

  /**
   * Переход к интерфейсу управления сообществом
   * @param id
   */
  groupManage(id) {
    this.router.navigate(['groups', 'mg', id]);
  }

}
