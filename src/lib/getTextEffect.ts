import { Layer } from "../models/Layer";
import { TextEffect } from "../models/TextEffect";

export function getTextEffect(layer: Layer): TextEffect | undefined {
  return layer.effects.find((effect) => effect.type === "text") as
    | TextEffect
    | undefined;
}
