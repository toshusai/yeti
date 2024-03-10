import { ContextMenu, ContextMenuItem } from "@toshusai/cmpui";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { GlobalStateContext } from "../../lib/GlobalStateContext";

export const LayerContextMenu = observer(
  (props: { children: React.ReactNode }) => {
    const [show, setShow] = useState(false);
    const globalState = useContext(GlobalStateContext);

    const editorState = globalState.editorState;

    return (
      <ContextMenu
        content={
          <>
            <ContextMenuItem
              onClick={action(() => {
                globalState.project.layers = globalState.project.layers.filter(
                  (layer) => {
                    return !editorState.selectedLayerIds.includes(layer.id);
                  },
                );
              })}
            >
              Delete
            </ContextMenuItem>
          </>
        }
        onOpenChange={(open) => setShow(open)}
        open={show}
      >
        {props.children}
      </ContextMenu>
    );
  },
);
