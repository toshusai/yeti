import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GlobalStateContext } from "../../lib/GlobalStateContext";
import { ImageEffect } from "../../models/ImageEffect";

export const ImageLayerListItem = observer(function ImageLayerListItem(props: {
  effect: ImageEffect;
}) {
  const globalState = useContext(GlobalStateContext);
  const asset = globalState.project.assets.find(
    (a) => a.id === props.effect.assetId,
  );
  return (
    <img
      className="w-[28px] h-[28px] object-contain image-rendering-pixelated border-1 border-solid"
      src={asset?.url}
      alt=""
    />
  );
});
