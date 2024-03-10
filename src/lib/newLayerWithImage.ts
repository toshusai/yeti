import { Asset } from "../models/Asset";
import { ImageEffect } from "../models/ImageEffect";
import { Layer } from "../models/Layer";
import { uuid } from "./uuid";

export function newLayerWithImage({
  img,
  asset,
  name,
}: {
  name: string;
  img: HTMLImageElement;
  asset: Asset;
}): Layer {
  const newImageEffect: ImageEffect = {
    type: "image",
    width: img.width,
    height: img.height,
    assetId: asset.id,
    element: img,
  };
  const imgNode: Layer = {
    effects: [
      {
        type: "transform",
        x: 0,
        y: 0,
        rotation: 0,
      },
      newImageEffect,
    ],
    id: uuid(),
    name: name,
  };
  return imgNode;
}
