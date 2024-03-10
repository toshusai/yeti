import { action } from "mobx";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { View } from "../../../models/View";
import { isSameIds } from "../../../utils/isSameIds";
import { getAllLayersPolygons } from "./getAllLayersPolygons";
import { getHitBetweenPolygonAndRect } from "./getHitBetweenPolygonAndRect";
import { useTextToRect } from "./useTextToRect";

export function useRectSelect(
  view: View,
  rect: { x: number; y: number; width: number; height: number } | null,
) {
  const { editorState, vCanvas, project } = useContext(GlobalStateContext);
  const ctx = vCanvas?.offscreenCtx;

  const textToRect = useTextToRect();

  useEffect(
    () =>
      action(() => {
        if (!ctx) return;
        const polygons = getAllLayersPolygons(project.layers, view, textToRect);
        if (!rect) return;

        const hits = getHitBetweenPolygonAndRect(polygons, rect);
        const noChange = isSameIds(
          hits.map((layer) => layer.id),
          editorState.selectedLayerIds,
        );
        if (!noChange) {
          editorState.selectedLayerIds = hits.map((layer) => layer.id);
        }
      }),
    [ctx, editorState, project.layers, rect, textToRect, view],
  );
}
