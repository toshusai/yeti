import { Layer } from "../../../models/Layer";
import { doLinesIntersect } from "../../../utils/collision/doLinesIntersect";
import { hitPolygon } from "../../../utils/collision/hitPolygon";
import { pointIsInRect } from "../../../utils/collision/pointIsInRect";

export function getHitBetweenPolygonAndRect(
  polygons: { polygon: [number, number][]; layer: Layer }[],
  rect: { x: number; y: number; width: number; height: number },
) {
  const hits: Layer[] = [];
  polygons.forEach(({ polygon, layer }) => {
    polygon.forEach((point, i) => {
      const rectCorners = [
        { x: rect.x, y: rect.y },
        { x: rect.x + rect.width, y: rect.y },
        { x: rect.x + rect.width, y: rect.y + rect.height },
        { x: rect.x, y: rect.y + rect.height },
      ];

      const pA = { x: point[0], y: point[1] };
      const pB = {
        x: polygon[i + 1] ? polygon[i + 1][0] : polygon[0][0],
        y: polygon[i + 1] ? polygon[i + 1][1] : polygon[0][1],
      };

      const hit =
        doLinesIntersect(pA, pB, rectCorners[0], rectCorners[1]) ||
        doLinesIntersect(pA, pB, rectCorners[1], rectCorners[2]) ||
        doLinesIntersect(pA, pB, rectCorners[2], rectCorners[3]) ||
        doLinesIntersect(pA, pB, rectCorners[3], rectCorners[0]) ||
        rectCorners.some((corner) => hitPolygon(corner.x, corner.y, polygon)) ||
        pointIsInRect(pA.x, pA.y, rect);

      if (hit) {
        if (hits.indexOf(layer) === -1) {
          hits.push(layer);
        }
      }
    });
  });
  return hits;
}
