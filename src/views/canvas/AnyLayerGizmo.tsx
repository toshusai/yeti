import { observer } from "mobx-react-lite";
import { ImageEffect } from "../../models/ImageEffect";
import { Layer } from "../../models/Layer";
import { TextEffect } from "../../models/TextEffect";
import { View } from "../../models/View";
import { ImageLayerGizmo } from "./ImageLayerGizmo";
import { TextLayerGizmo } from "./TextLayerGizmo";

export const AnyLayerGizmo = observer(
  (props: { view: View; disabled?: boolean; layer: Layer }) => {
    if (props.disabled) return null;

    const textEffect = props.layer.effects.find(
      (effect) => effect.type === "text",
    ) as TextEffect | undefined;

    const imageEffect = props.layer.effects.find(
      (effect) => effect.type === "image",
    ) as ImageEffect | undefined;

    if (textEffect) {
      return (
        <TextLayerGizmo
          view={props.view}
          effect={textEffect}
          layer={props.layer}
        />
      );
    }
    if (imageEffect) {
      return (
        <ImageLayerGizmo
          view={props.view}
          effect={imageEffect}
          layer={props.layer}
        />
      );
    }

    return null;
  },
);
