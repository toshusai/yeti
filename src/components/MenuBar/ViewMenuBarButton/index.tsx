import { MenuBarButton, MenuBarItem } from "@toshusai/cmpui";
import { action } from "mobx";
import { useContext } from "react";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { ShortcutListItem } from "../../ShortcutListItem";

export function ViewMenuBarButton() {
  const { editorState } = useContext(GlobalStateContext);
  return (
    <MenuBarButton
      content={
        <>
          <ShortcutListItem
            as={MenuBarItem}
            onClick={action(() => {
              editorState.view.showGrid = !editorState.view.showGrid;
            })}
          >
            {editorState.view.showGrid ? "Hide" : "Show"} Grid
          </ShortcutListItem>
          <ShortcutListItem
            as={MenuBarItem}
            onClick={action(() => {
              editorState.view.showRulers = !editorState.view.showRulers;
            })}
          >
            {editorState.view.showRulers ? "Hide" : "Show"} Rulers
          </ShortcutListItem>
        </>
      }
    >
      View
    </MenuBarButton>
  );
}
