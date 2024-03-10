import { ListItem } from "@toshusai/cmpui";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import { GlobalStateContext } from "../../lib/GlobalStateContext";
import { useMetaKeyLayerSelect } from "../../lib/useMetaKeyLayerSelect";
import { Layer } from "../../models/Layer";
import { ImageLayerListItem } from "./ImageLayerListItem";
import { LayerContextMenu } from "./LayerContextMenu";
import { TextLayerListItem } from "./TextLayerListItem";

export const LayerListItem = observer((props: { layer: Layer }) => {
  const globalState = useContext(GlobalStateContext);
  const editorState = globalState.editorState;
  const metaKeyLayerSelect = useMetaKeyLayerSelect();

  const isSelected = useMemo(() => {
    return (
      editorState.selectedLayerIds.findIndex((id) => id === props.layer.id) !==
      -1
    );
  }, [editorState.selectedLayerIds, props.layer.id]);

  return (
    <LayerContextMenu>
      <ListItem
        as="div"
        className="w-full"
        onClick={action((e: MouseEvent) => {
          if (e.metaKey) {
            metaKeyLayerSelect(props.layer.id);
          } else {
            editorState.selectedLayerIds = [props.layer.id];
          }
        })}
        selected={isSelected}
      >
        <div className="flex justify-between w-full items-center">
          <div className="line-clamp-1">{props.layer.name}</div>
        </div>

        {props.layer.effects.map((effect, i) => {
          if (effect.type === "image") {
            return <ImageLayerListItem key={i} effect={effect} />;
          } else if (effect.type === "text") {
            return <TextLayerListItem key={i} effect={effect} />;
          }
        })}
      </ListItem>
    </LayerContextMenu>
  );
});
