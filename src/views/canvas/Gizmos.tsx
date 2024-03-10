import { observer } from "mobx-react-lite";
import { useSelectedLayers } from "../../lib/useSelectedLayers";
import { ToolType } from "../../models/EditorState";
import { View } from "../../models/View";
import { AnyLayerGizmo } from "./AnyLayerGizmo";

export const Gizmos = observer((props: { view: View; mode: ToolType }) => {
  const selectedLayer = useSelectedLayers();
  return (
    props.mode === "default" &&
    selectedLayer.map((layer) => {
      return <AnyLayerGizmo key={layer.id} view={props.view} layer={layer} />;
    })
  );
});
