import {Injectable} from '@angular/core';
import {BaseDataService} from "../core/services/basedataservice";
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Post} from "../models/post/post";

const methods = {
  post: 'posts',
  mass: 'posts/massadd',
  send: 'posts/send'
};

@Injectable()
export class PostService {


  posts: Observable<Array<Post>>;
  private _posts: BehaviorSubject<Array<Post>>;


  dataStore: {
    posts: Array<Post>;
  };

  fetching: {
    posts: boolean;
  };

  constructor(private dataService: BaseDataService) {
    this.dataStore = {posts: null};
    this._posts = <BehaviorSubject<Array<Post>>> new BehaviorSubject(this.dataStore.posts);
    this.posts = this._posts.asObservable();
    this.fetching = {posts: false};
  }

  /**
   * Получить посты
   * @param params
   */

  refreshPosts(params) {
    if (!this.fetching.posts) {
      this.fetching.posts = true;
      this.dataService.getData(params, methods.post).subscribe(data => {
        this.dataStore.posts = [];
        data.forEach(p => {
          this.dataStore.posts.push(new Post().deserialize(p));
        });
        this._posts.next(this.dataStore.posts);
        this.fetching.posts = false;
      })
    }
  }

  /**
   * Добавить пост
   * @param params
   * @returns {Observable<any>}
   */
  addPost(params, file): Observable<any> {

    let formData: FormData = this.prepareData(params, file);

    return this.dataService.addData(formData, methods.post)
  }

  /**
   * Массовое добавление постов
   * @param params
   * @returns {Observable<any>}
   */
  addMassPost(params, file): Observable<any> {

    let formData: FormData = this.prepareData(params, file);

    return this.dataService.addData(formData, methods.mass)
  }

  /**
   * Обновить пост
   * @param params
   * @returns {Observable<any>}
   */
  updPost(params): Observable<any> {
    return this.dataService.updData(params, methods.post);
  }

  /**
   * Удалить пост по id
   * @param id
   */
  delPost(id, params) {
    this.dataService.delData(id, methods.post).subscribe(response => {
      if (response) {
        this.refreshPosts(params);
      }
    })
  }

  /**
   * Отправить пост на стену вк
   * @param params
   * @returns {Observable<any>}
   */
  sendPost(params): Observable<any> {
    return this.dataService.addData(params, methods.send);
  }

  /**
   * Подготовка данных перед отправкой на сервер
   * @param params
   * @param file
   */
  prepareData(params, file): FormData {
    let formData: FormData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }
    formData.append('data', JSON.stringify(params));

    return formData;
  }


}
