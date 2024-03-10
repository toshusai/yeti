import { degToRad, hsvaToRgba, rgbaToCss } from "@toshusai/cmpui";
import { getTransformOrError } from "../../../lib/getTransformOrError";
import { Layer } from "../../../models/Layer";
import { Project } from "../../../models/Project";
import { TextEffect } from "../../../models/TextEffect";

export function renderTextEffect(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  textEffect: TextEffect,
  layer: Layer,
  project: Project,
) {
  const tfEffect = getTransformOrError(layer);
  const x = tfEffect.x;
  const y = tfEffect.y;

  const color = hsvaToRgba(textEffect.color);
  ctx.fillStyle = rgbaToCss(color);
  const asset = project.assets.find((asset) => asset.id === textEffect.assetId);
  const name = asset ? asset.name : "Arial";
  ctx.font = `${textEffect.fontSize}px ${name}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(degToRad(tfEffect.rotation));
  ctx.translate(-x, -y);
  ctx.fillText(textEffect.text, x, y);
  ctx.restore();
}
