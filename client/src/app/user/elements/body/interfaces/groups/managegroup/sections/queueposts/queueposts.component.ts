import {Component, OnDestroy, OnInit} from "@angular/core";
import {Basesectiongroup} from "../baseSection/basesectiongroup";
import {GroupsService} from "../../../../../../../../services/groups.service";
import {PostService} from "../../../../../../../../services/post.service";
import {Post} from "../../../../../../../../models/post/post";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-queueposts',
  templateUrl: 'queueposts.component.html'
})

export class QueuepostsComponent extends Basesectiongroup implements OnInit, OnDestroy {

  subPosts: Subscription;
  posts: Array<Post>;
  filter: any;
  visibleFilter: boolean;

  constructor(_gs: GroupsService, private _ps: PostService) {
    super(_gs);
    this.visibleFilter = false;
  }

  /**
   * Обработчик события инициализации компонента
   */
  ngOnInit() {
    super.ngOnInit();
    this.getPosts();
    this.defaultFilter();
    this._ps.refreshPosts(this.filter);
  }

  /**
   * Подписка на получение постов
   */
  getPosts() {
    this.subPosts = this._ps.posts.subscribe(data => {
      this.posts = data;
    })
  }

  /**
   * Удалить пост
   * @param id
   */
  delPost(id) {
    this._ps.delPost(id, this.filter)
  }

  /**
   * Отправить пост
   * @param {Post} post
   */
  sendPost(post: Post) {
    this._ps.sendPost(post).subscribe(() => {
      this.delPost(post.id);
    })
  }

  /**
   * Установка значения фильтра
   * @param filter
   */
  setFilter(filter) {
    if (filter) {
      Object.assign(this.filter, filter);
    } else {
      this.defaultFilter();
      this.visibleFilter = false;
    }
    this._ps.refreshPosts(this.filter);
  }

  /**
   * Сброс фильтра
   */
  defaultFilter() {
    this.filter = {group: this.group.id};
  }

  /**
   * Обработчик события уничтожения компонента
   */
  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
