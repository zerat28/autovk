import {Model} from "../../core/models/model";
import {Deserializable} from "../../core/interfaces/deserialization";
import {Counters} from "../counters/counters";

export class Group extends Model implements Deserializable<Group> {
  /**
   * Идентификатор
   */
  id: number;
  /**
   * Наименование сообщества
   */
  name: string;
  /**
   * Короткий адрес сообщества(alias)
   */
  screen_name: string;
  /**
   * Флаг публичности сообщества
   */
  is_closed: boolean;
  /**
   * Тип Сообщества
   */
  type: string;
  /**
   * Является ли текущий пользователем руководителем сообщества
   */
  is_admin: boolean;
  /**
   * Является ли текущей пользователь членом сообщества
   */
  is_member: boolean;
  /**
   * Количество подписчиков
   */
  members_count: number;
  /**
   * Счетчики сообщества
   */
  counters: Counters;
  /**
   * Линк на аватар сообщества размером 50*50
   */
  photo_50: string;
  /**
   * Линк на аватар сообщества размером 100*100
   */
  photo_100: string;
  /**
   * Линк на аватар сообщества размером 200*200
   */
  photo_200: string;
  in_work: boolean;

  deserialize(input: any): Group {
    Object.assign(this, input);
    return this;
  }

}
