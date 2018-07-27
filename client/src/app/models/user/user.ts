import {Model} from "../../core/models/model";
import {Deserializable} from "../../core/interfaces/deserialization";
import {Counters} from "../counters/counters";

export class User extends Model implements Deserializable<User> {

  /**
   * Идентификатор
   */
  id: number;
  /**
   * Имя пользователя в системе
   */
  name: string;
  /**
   * Email пользователя в системе
   */
  email: string;
  /**
   * Имя пользователя в вк
   */
  first_name: string;
  /**
   * Фамилия пользователя в ве
   */
  last_name: string;
  /**
   * Линк на фото пользовтаеля в вк
   */
  photo_200: string;
  /**
   * Счетчики вк
   */
  counters: Counters;
  /**
   * Дата рождения в вк
   */
  bdate: any;
  /**
   * Фланг синхронизации
   */
  is_sync: boolean;

  deserialize(input: any): User {
    Object.assign(this, input);

    if (input.counters) {
      this.counters = new Counters().deserialize(input.counters);
    }

    return this;
  }

}
