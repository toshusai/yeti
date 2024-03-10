import { RectGizmo, degToRad, radToDeg } from "@toshusai/cmpui";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { getTransformOrError } from "../../lib/getTransformOrError";
import { useSelectedLayers } from "../../lib/useSelectedLayers";
import { useUndo } from "../../lib/useUndo";
import { ImageEffect } from "../../models/ImageEffect";
import { Layer } from "../../models/Layer";
import { View } from "../../models/View";

export const ImageLayerGizmo = observer(
  (props: { view: View; effect: ImageEffect; layer: Layer }) => {
    const selectedLayers = useSelectedLayers();
    const { start, commit } = useUndo();
    const transform = getTransformOrError(props.layer);
    return (
      <RectGizmo
        isResizable={selectedLayers.length === 1}
        isRotatable={selectedLayers.length === 1}
        x={props.view.x + transform.x * props.view.scale}
        y={props.view.y + transform.y * props.view.scale}
        nobRadius={4}
        angle={degToRad(transform.rotation)}
        width={props.effect.width * props.view.scale}
        height={props.effect.height * props.view.scale}
        onStart={start}
        onEnd={commit}
        onMove={action((data) => {
          if (props.effect === null) return;
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

          if (data.angle) {
            transform.rotation = radToDeg(data.angle);
          }

          transform.x = (data.x - props.view.x) / props.view.scale;

          transform.y = (data.y - props.view.y) / props.view.scale;

          if (data.width && data.height) {
            props.effect.width = data.width / props.view.scale;
            props.effect.height = data.height / props.view.scale;
          }
        })}
      />
    );
  },
);
