import {Component} from "@angular/core";
import {Basesectiongroup} from "../baseSection/basesectiongroup";
import {GroupsService} from "../../../../../../../../services/groups.service";
import {PostService} from "../../../../../../../../services/post.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-massposts',
  templateUrl: 'massposts.component.html'
})

export class MasspostsComponent extends Basesectiongroup {


  form: FormGroup;
  attachment: any;

  constructor(_gs: GroupsService, private _fb: FormBuilder, private _ps: PostService) {
    super(_gs);
  }

  /**
   * Обработчик события инициализации компонента
   */
  ngOnInit() {
    super.ngOnInit();
    this.formInit();
  }

  /**
   * Установка приклепленного изображения
   * @param file
   */
  setAttachment(file: any) {
    this.attachment = file;
  }

  /**
   * Сохранить посты
   */
  addPosts() {
    this.resetAlert();
    if (this.form.valid && this.attachment) {

      this.form.value.group_id = this.group.id;

      this._ps.addMassPost(this.form.value, this.attachment).subscribe((result) => {
        this.alert = {text: 'Добавлено постов: ' + result.filter(val => val).length, type: 'success'}
        this.formInit();
      })
    }
  }


  /**
   * Инициализация формы
   */
  formInit() {
    this.form = this._fb.group({
      datetime: [null, Validators.required],
      interval: [null, Validators.required],
      attachment: [null]
    })
  }

}
