import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent {

  @Input() alert: any;

  resetAlert(){
    this.alert = null;
  }

}
