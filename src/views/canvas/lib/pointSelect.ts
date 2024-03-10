import { Layer } from "../../../models/Layer";
import { View } from "../../../models/View";
import { hitPolygon } from "../../../utils/collision/hitPolygon";
import { getAllLayersPolygons } from "./getAllLayersPolygons";
import { useTextToRect } from "./useTextToRect";

export function pointSelect(
  x: number,
  y: number,
  layers: Layer[],
  view: View,
  textToRectFn: ReturnType<typeof useTextToRect>,
): Layer[] {
  const polygons = getAllLayersPolygons(layers, view, textToRectFn);
  const results: Layer[] = [];
  for (const { polygon, layer } of polygons) {
    const hit = hitPolygon(x, y, polygon);
    if (hit) {
      results.push(layer);
    }
  }
  return results;
}
