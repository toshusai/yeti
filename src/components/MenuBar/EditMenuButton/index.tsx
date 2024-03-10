import { MenuBarButton, MenuBarItem } from "@toshusai/cmpui";
import { useUndo } from "../../../lib/useUndo";
import { ShortcutListItem } from "../../ShortcutListItem";

export function EditMenuBarButton() {
  const { undo, redo } = useUndo();
  return (
    <MenuBarButton
      content={
        <>
          <ShortcutListItem as={MenuBarItem} shortcut="⌘+Z" onClick={undo}>
            Undo
          </ShortcutListItem>
          <ShortcutListItem as={MenuBarItem} shortcut="⌘+⇧+Z" onClick={redo}>
            Redo
          </ShortcutListItem>
        </>
      }
    >
      Edit
    </MenuBarButton>
  );
}
