import { Layer } from "../models/Layer";
import { TransformEffect } from "../models/TransformEffect";

export function getTransformOrError(layer: Layer) {
  const effect = layer.effects.find((effect) => effect.type === "transform");
  if (!effect) throw new Error("No transform effect found");
  return effect as TransformEffect;
}
