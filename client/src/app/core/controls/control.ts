import {Input} from "@angular/core";
import {FormControl} from "@angular/forms";

export class Control {

  @Input() placeholder: string;
  @Input() control: FormControl;
  @Input() label: string;

}
