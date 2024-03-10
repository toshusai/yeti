import { IconButton } from "@toshusai/cmpui";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { Icon } from "../../components/Icon";
import { useUndo } from "../../lib/useUndo";
import { ImageEffect } from "../../models/ImageEffect";
import { Label } from "./Label";
import { LabeledSliderNumberField } from "./LabeledSliderNumberField";

export const ImageLayerInspector = observer(
  ({
    effects,
  }: {
    effects: ImageEffect[];
  }) => {
    const { start, commit } = useUndo();

    const handleResetDimensions = useCallback(() => {
      for (const effect of effects) {
        if (!effect.element) return;
        effect.width = effect.element.width;
        effect.height = effect.element.height;
      }
    }, [effects]);

    return (
      <>
        <Label text="Image" />
        <div className="flex gap-4">
          <LabeledSliderNumberField
            label="width"
            value={effects.map((v) => v.width)}
            onChangeValue={action((value) => {
              effects.forEach((v, i) => {
                v.width = value[i];
              });
            })}
            onStart={start}
            onEnd={commit}
          />

          <LabeledSliderNumberField
            label="height"
            value={effects.map((v) => v.height)}
            onChangeValue={action((value) => {
              effects.forEach((v, i) => {
                v.height = value[i];
              });
            })}
            onStart={start}
            onEnd={commit}
          />
          <IconButton className="min-w-32" onClick={handleResetDimensions}>
            <Icon size={16} name="aspect_ratio" />
          </IconButton>
        </div>
      </>
    );
  },
);
