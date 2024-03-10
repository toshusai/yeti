import { RectGizmo, degToRad, radToDeg } from "@toshusai/cmpui";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GlobalStateContext } from "../../lib/GlobalStateContext";
import { getTransformOrError } from "../../lib/getTransformOrError";
import { useSelectedLayers } from "../../lib/useSelectedLayers";
import { useUndo } from "../../lib/useUndo";
import { Layer } from "../../models/Layer";
import { TextEffect } from "../../models/TextEffect";
import { View } from "../../models/View";
import { useTextToRect } from "./lib/useTextToRect";

export const TextLayerGizmo = observer(
  (props: { view: View; effect: TextEffect; layer: Layer }) => {
    const ctx = useContext(GlobalStateContext);
    const { editorState } = ctx;

    const selectedLayers = useSelectedLayers();
    if (editorState.selectedLayerIds.length === 0) return null;

    const transform = getTransformOrError(props.layer);
    const textToRect = useTextToRect();
    const rect = textToRect(props.effect, transform);
    const { start, commit } = useUndo();
    if (!rect) return null;

    return (
      <RectGizmo
        isResizable={selectedLayers.length === 1}
        isRotatable={selectedLayers.length === 1}
        x={props.view.x + transform.x * props.view.scale}
        y={props.view.y + transform.y * props.view.scale}
        nobRadius={4}
        angle={degToRad(transform.rotation)}
        width={rect.width * props.view.scale}
        height={rect.height * props.view.scale}
        onEnd={commit}
        onStart={start}
        onMove={action((data) => {
          if (!data.x) return;
          if (!data.y) return;
          const deltaX =
            (data.x - props.view.x) / props.view.scale - transform.x;
          const deltaY =
            (data.y - props.view.y) / props.view.scale - transform.y;

          if (selectedLayers.length > 1) {
            selectedLayers.forEach((node) => {
              const transform = getTransformOrError(node);
              transform.x += deltaX;
              transform.y += deltaY;
            });
            return;
          }

          transform.x = (data.x - props.view.x) / props.view.scale;
          transform.y = (data.y - props.view.y) / props.view.scale;

          if (data.angle) {
            transform.rotation = radToDeg(data.angle);
          }
          if (data.height) {
            props.effect.fontSize = data.height / props.view.scale;
          }
        })}
      />
    );
  },
);
