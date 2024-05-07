import Breed from "./breed";

export default interface Image {
  id: string;
  url: string;
  width: number;
  height: number;
  mime_type: string;
  breeds: Breed[];
}
