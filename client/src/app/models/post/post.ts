import {Model} from "../../core/models/model";
import {Deserializable} from "../../core/interfaces/deserialization";

export class Post extends Model implements Deserializable<Post> {

  /**
   * Идентификатор
   */
  id: number;
  /**
   * id сообщества, в которое добавляется пост
   */
  group_id: number;
  /**
   * Дата добавления
   */
  datetime: any;
  /**
   * Линк на изображение, прикрепленное к посту
   */
  img: string;
  /**
   * Текст поста
   */
  text: string;
  /**
   * Дата создания поста в системе
   */
  created_at: any;
  /**
   * Дата обновления поста в системе
   */
  updated_at: any;

  deserialize(input: any): Post {
    Object.assign(this, input);
    return this;
  }

}
