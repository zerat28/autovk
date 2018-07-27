import {Component, OnDestroy, OnInit} from "@angular/core";
import {VkauthService} from "../../../../../services/vkauth.service";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../../../../models/user/user";
import {UserService} from "../../../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit, OnDestroy {

  subLink: Subscription;
  link: string;
  subUser: Subscription;
  user: User;
  form: FormGroup;

  constructor(private _vs: VkauthService, private _us: UserService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getLink();
    this.getUser();
    this.formInit();
  }

  getLink() {
    this.subLink = this._vs.awaitLink().subscribe(link => {
      this.link = link;
    })
  }

  getUser() {
    this.subUser = this._us.awaitUser().subscribe(user => {
      this.user = user;
    })
  }

  setToken() {
    if (this.form.valid) {
      this._vs.setToken(this.form.value).subscribe(() => {
        this._us.refreshUser();
      })
    }
  }

  formInit() {
    this.form = this.fb.group({
      access_token: [null, Validators.required]
    })
  }

  ngOnDestroy() {
    this.subLink.unsubscribe();
    this.subUser.unsubscribe();
  }

}
