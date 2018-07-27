import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-postfilter',
  templateUrl: 'postfilter.component.html'
})

export class PostfilterComponent implements OnInit {

  form: FormGroup;
  @Output() sendFilter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.formInit();
  }

  setFilter() {
    this.sendFilter.emit(this.form.value);
  }

  resetFilter() {
    this.sendFilter.emit(false);
  }

  formInit() {
    this.form = this._fb.group({
      date_start: [null],
      date_end: [null]
    })
  }

}
