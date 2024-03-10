import { degToRad } from "@toshusai/cmpui";
import { getTransformOrError } from "../../../lib/getTransformOrError";
import { ImageEffect } from "../../../models/ImageEffect";
import { Layer } from "../../../models/Layer";

export function renderImage(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  imageEffect: ImageEffect,
  layer: Layer,
) {
  if (!imageEffect.element) return;
  const tfEffect = getTransformOrError(layer);
  let scaleX = 1;
  let scaleY = 1;
  let w = imageEffect.width;
  let h = imageEffect.height;
  const anchorX = tfEffect.x;
  const anchorY = tfEffect.y;
  if (imageEffect.width < 0) {
    scaleX = -1;
    w = -imageEffect.width;
  }
  if (imageEffect.height < 0) {
    scaleY = -1;
    h = -imageEffect.height;
  }
  const rad = degToRad(tfEffect.rotation);
  ctx.save();
  ctx.scale(scaleX, scaleY);
  ctx.translate(anchorX, anchorY);
  ctx.rotate(rad);
  ctx.translate(-anchorX, -anchorY);
  try {
    ctx.drawImage(
      imageEffect.element,
      tfEffect.x * scaleX - w / 2,
      tfEffect.y * scaleY - h / 2,
      w,
      h,
    );
  } catch (e) {}
  ctx.restore();
}
