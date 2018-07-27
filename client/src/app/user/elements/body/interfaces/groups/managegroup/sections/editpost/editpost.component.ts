import {Component, OnInit} from "@angular/core";
import {AddpostComponent} from "../addpost/addpost.component";
import {FormBuilder} from "@angular/forms";
import {PostService} from "../../../../../../../../services/post.service";
import {GroupsService} from "../../../../../../../../services/groups.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../../../../../../models/post/post";
import {Workerform} from "../../../../../../../../core/classes/workerform";

@Component({
  selector: 'app-editpost',
  templateUrl: 'editpost.component.html'
})

export class EditpostComponent extends AddpostComponent implements OnInit {

  subId: Subscription;
  id: number;
  subPosts: Subscription;
  post: Post;
  workerform: Workerform;

  constructor(_gs: GroupsService, _fb: FormBuilder, _ps: PostService, private route: ActivatedRoute, private router: Router) {
    super(_gs, _fb, _ps);
  }

  /**
   * Обработчик события инициализации компонента
   */
  ngOnInit() {
    super.ngOnInit();
    this.getId();
    this.getPost();
  }

  /**
   * Получить id поста из url
   */
  getId() {
    this.subId = this.route.params.subscribe(params => {
      this.id = +params['id'];
      //Подтянуть пост
      this._ps.refreshPosts({id: this.id});
    });
  }

  /**
   * Получить пост
   */
  getPost() {
    this.subPosts = this._ps.posts.subscribe((posts) => {

      if (posts) {
        this.post = posts[0];
        this.workerform.fillform(this.post);
        this.form.controls['datetime'].patchValue(new Date(this.form.value.datetime));
      }

    })
  }

  /**
   * Сохранить пост
   */
  savePost() {
    if (this.form.valid && (this.attachment || this.form.value.text)) {

      this.post.deserialize(this.form.value);

      this._ps.updPost(this.post).subscribe(() => {
        this.router.navigate(['../../queue'], {relativeTo: this.route})
      })
    }
  }

  /**
   * Инициализация формы
   */
  formInit() {

    super.formInit();
    this.workerform = new Workerform(this.form);
  }

}
