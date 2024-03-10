import { getTransformOrError } from "../../../lib/getTransformOrError";
import { Layer } from "../../../models/Layer";
import { View } from "../../../models/View";
import { rectToPolygon } from "../../../utils/collision/rectToPolygon";
import { useTextToRect } from "./useTextToRect";

export function getAllLayersPolygons(
  layers: Layer[],
  view: View,
  textToRectFn: ReturnType<typeof useTextToRect>,
) {
  const polygons = layers
    .map((layer) => {
      for (const effect of layer.effects) {
        const transform = getTransformOrError(layer);
        if (effect.type === "text") {
          const rect = textToRectFn(effect, transform);
          if (!rect) return;

          const polygon = rectToPolygon(
            rect.x * view.scale + view.x,
            rect.y * view.scale + view.y,
            rect.width * view.scale,
            rect.height * view.scale,
            transform.rotation,
          );
          return { polygon, layer };
        } else if (effect.type === "image") {
          if (!effect.element) return;

          const polygon = rectToPolygon(
            transform.x * view.scale + view.x,
            transform.y * view.scale + view.y,
            effect.width * view.scale,
            effect.height * view.scale,
            transform.rotation,
          );

          return { polygon, layer };
        }
      }
    })
    .filter((v) => v) as {
    polygon: [number, number][];
    layer: Layer;
  }[];

  return polygons;
}
