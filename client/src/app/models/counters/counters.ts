import {Model} from "../../core/models/model";
import {Deserializable} from "../../core/interfaces/deserialization";

export class Counters extends Model implements Deserializable<Counters> {

  albums: number;
  videos: number;
  audios: number;
  photos: number;
  notes: number;
  friends: number;
  groups: number;
  online_friends: number;
  mutual_friends: number;
  user_videos: number;
  followers: number;
  pages: number;

  deserialize(input: any): Counters {
    Object.assign(this, input);
    return this;
  }

}
