import {Model} from "../../core/models/model";
import {Deserializable} from "../../core/interfaces/deserialization";

export class Token extends Model implements Deserializable<Token> {

  /**
   * Значение csrf токена
   */
  value: string;

  deserialize(input: any): Token {
    Object.assign(this, input);
    return this;
  }

}
