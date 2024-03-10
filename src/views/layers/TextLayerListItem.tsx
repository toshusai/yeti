import { hsvaToRgba, rgbaToCss } from "@toshusai/cmpui";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GlobalStateContext } from "../../lib/GlobalStateContext";
import { TextEffect } from "../../models/TextEffect";

export const TextLayerListItem = observer(function TextLayerListItem(props: {
  effect: TextEffect;
}) {
  const globalState = useContext(GlobalStateContext);
  const asset = globalState.project.assets.find(
    (a) => a.id === props.effect.assetId,
  );

  return (
    <div
      className="line-clamp-1"
      style={{
        fontFamily: asset?.name,
        color: rgbaToCss(hsvaToRgba(props.effect.color)),
      }}
    >
      {props.effect.text}
    </div>
  );
});
