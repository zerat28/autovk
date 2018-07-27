import {Component, Input} from '@angular/core';
import {Controlitem} from "../../interfaces/controlitem";
import {Control} from "../control";

@Component({
  selector: 'control-select',
  templateUrl: 'select.component.html'
})

export class SelectComponent extends Control{

  @Input() options: Array<Controlitem>;

}

