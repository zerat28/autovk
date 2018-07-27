import {Component, Input, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../../../../services/user.service";
import {User} from "../../../../../../models/user/user";
import {Workerform} from "../../../../../../core/classes/workerform";

@Component({
  selector: 'app-editprofile',
  templateUrl: 'editprofile.component.html'
})

export class EditprofileComponent implements OnInit{

  @Input() user: User;
  form: FormGroup;
  workerform:Workerform;
  alert: any;

  constructor(private _us: UserService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formInit();
    this.workerform.fillform(this.user);
  }

  saveUser() {
    this._us.updUser(this.form.value).subscribe(() => {
      this.alert = {text: 'Данные пользователя обновлены', type: 'success'};
      this._us.refreshUser();
    })
  }

  formInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.workerform = new Workerform(this.form);
  }

}
