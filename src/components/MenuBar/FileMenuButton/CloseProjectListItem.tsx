import { MenuBarItem } from "@toshusai/cmpui";
import { useCallback, useContext } from "react";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { initialEditorState } from "../../../lib/initialEditorState";
import { initialProject } from "../../../lib/initialProject";
import { ShortcutListItem } from "../../ShortcutListItem";

export function CloseProjectListItem() {
  const globalState = useContext(GlobalStateContext);
  const close = useCallback(() => {
    globalState.project = initialProject();
    globalState.editorState = initialEditorState();
  }, [globalState]);

  return (
    <ShortcutListItem as={MenuBarItem} onClick={close} shortcut="⌘+W">
      Close Project
    </ShortcutListItem>
  );
}
