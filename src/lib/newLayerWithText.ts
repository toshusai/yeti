import { Layer } from "../models/Layer";
import { uuid } from "./uuid";

export function newLayerWithText(): Layer {
  return {
    id: uuid(),
    name: "Text",
    effects: [
      {
        id: uuid(),
        color: { h: 0, s: 0, v: 0, a: 1 },
        assetId: "Arial",
        fontSize: 32,
        text: "Text",
        type: "text",
      },
      {
        type: "transform",
        x: 0,
        y: 0,
        rotation: 0,
      },
    ],
  };
}
