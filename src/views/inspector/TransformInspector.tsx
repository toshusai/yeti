import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useSelectedLayers } from "../../lib/useSelectedLayers";
import { useUndo } from "../../lib/useUndo";
import { TransformEffect } from "../../models/TransformEffect";
import { Label } from "./Label";
import { LabeledSliderNumberField } from "./LabeledSliderNumberField";

export const TransformInspector = observer(function TransformInspector() {
  const selectedLayers = useSelectedLayers();
  const { start, commit } = useUndo();
  if (selectedLayers.length === 0) return null;
  const layers = selectedLayers;
  const effects = layers
    .map((layer) => layer.effects.find((effect) => effect.type === "transform"))
    .filter((e) => e) as TransformEffect[];
  return (
    <>
      <Label text="Transform" />
      <div className="flex gap-4">
        <LabeledSliderNumberField
          label="x"
          value={effects.map((layer) => layer.x)}
          onChangeValue={action((value) => {
            effects.forEach((layer, i) => {
              layer.x = value[i];
            });
          })}
          onStart={start}
          onEnd={commit}
        />
        <LabeledSliderNumberField
          label="y"
          value={effects.map((layer) => layer.y)}
          onChangeValue={action((value) => {
            effects.forEach((layer, i) => {
              layer.y = value[i];
            });
          })}
          onStart={start}
          onEnd={commit}
        />
      </div>

      <LabeledSliderNumberField
        label="rotation"
        value={effects.map((layer) => layer.rotation)}
        onChangeValue={action((value) => {
          effects.forEach((layer, i) => {
            layer.rotation = value[i];
          });
        })}
        onStart={start}
        onEnd={commit}
      />
    </>
  );
});
