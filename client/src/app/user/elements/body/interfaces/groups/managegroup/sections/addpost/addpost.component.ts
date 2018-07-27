import {Component, OnInit} from "@angular/core";
import {Basesectiongroup} from "../baseSection/basesectiongroup";
import {GroupsService} from "../../../../../../../../services/groups.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../../../../../../services/post.service";
import {Post} from "../../../../../../../../models/post/post";

@Component({
  selector: 'app-addpost',
  templateUrl: 'addpost.component.html'
})

export class AddpostComponent extends Basesectiongroup implements OnInit {

  form: FormGroup;
  attachment: any;

  constructor(_gs: GroupsService, private _fb: FormBuilder, protected _ps: PostService) {
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
   * Сохранить пост
   */
  savePost() {
    this.resetAlert();
    if (this.form.valid && (this.attachment || this.form.value.text)) {

      let post = new Post().deserialize(this.form.value);
      post.group_id = this.group.id;

      this._ps.addPost(post, this.attachment).subscribe(() => {
        this.alert = {text: 'Пост успешно добавлен!', type: 'success'}
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
      text: [null],
      img: [null]
    })
  }

}
