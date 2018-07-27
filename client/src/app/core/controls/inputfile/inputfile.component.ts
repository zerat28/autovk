import {Component, ViewChild, ElementRef, Output, EventEmitter, Input} from '@angular/core';
import {Control} from "../control";

@Component({
  selector: 'control-inputfile',
  templateUrl: 'inputfile.component.html',
})

export class InputfileComponent extends Control{

  @Input() accept: string;
  @Output() setFile: EventEmitter<FormData> = new EventEmitter<FormData>();
  @ViewChild('fileInput') inputEl: ElementRef;


  /**
   * Обработчик события изменения значения в контроле
   * @param event
   */
  onChange(event) {
    let files = event.target.files;
    if (files.length > 0) {
      this.setFile.emit(event.target.files[0]);
    }
  }


}
