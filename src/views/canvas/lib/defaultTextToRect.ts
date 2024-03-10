import { TextEffect } from "../../../models/TextEffect";
import { TransformEffect } from "../../../models/TransformEffect";

export function defaultTextToRect(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  text: TextEffect,
  transform: TransformEffect,
) {
  ctx.font = `${text.fontSize}px sans-serif`;
  const width = ctx.measureText(text.text).width;
  const height = text.fontSize;
  return {
    x: transform.x,
    y: transform.y,
    width,
    height,
  };
}
