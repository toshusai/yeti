import { Asset } from "../models/Asset";
import { uuid } from "./uuid";

export function newImageAsset({
  name,
  src,
}: {
  name: string;
  src: string;
}): Asset {
  return {
    id: uuid(),
    name: name,
    type: "image",
    url: src,
  };
}
