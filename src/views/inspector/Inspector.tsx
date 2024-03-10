import { observer } from "mobx-react-lite";
import { useSelectedLayers } from "../../lib/useSelectedLayers";
import { ImageEffect } from "../../models/ImageEffect";
import { TextEffect } from "../../models/TextEffect";
import { ImageLayerInspector } from "./ImageLayerInspector";
import { NameInspector } from "./NameInspector";
import { TextLayerInspector } from "./TextLayerInspector";
import { TransformInspector } from "./TransformInspector";

export const Inspector = observer(() => {
  const selectedLayers = useSelectedLayers();
  const allEffects = selectedLayers.flatMap((layer) => layer.effects);

  const textEffects = allEffects.filter(
    (effect) => effect.type === "text",
  ) as TextEffect[];
  const imageEffects = allEffects.filter(
    (effect) => effect.type === "image",
  ) as ImageEffect[];

  return (
    <div className="overflow-auto">
      <div className="flex flex-col w-full gap-8 items-start p-8">
        <NameInspector />
        <TransformInspector />
        {textEffects.length > 0 && <TextLayerInspector effects={textEffects} />}
        {imageEffects.length > 0 && (
          <ImageLayerInspector effects={imageEffects} />
        )}
      </div>
    </div>
  );
});
