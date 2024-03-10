import { MenuBarButton, MenuBarItem, Modal } from "@toshusai/cmpui";
import { useState } from "react";
import { ShortcutListItem } from "../../ShortcutListItem";
import { CanvasSizeSettings } from "./CanvasSizeSettings";

export function SettingsMenuBarButton() {
  const [show, setShow] = useState(false);
  return (
    <>
      <MenuBarButton
        content={
          <>
            <ShortcutListItem as={MenuBarItem} onClick={() => setShow(true)}>
              Canvas Size
            </ShortcutListItem>
          </>
        }
      >
        Settings
      </MenuBarButton>
      <Modal title="Canvas Size" open={show} onClose={() => setShow(false)}>
        <CanvasSizeSettings open={show} />
      </Modal>
    </>
  );
}
