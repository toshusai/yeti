import { MenuBarButton, MenuBarItem } from "@toshusai/cmpui";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ShortcutListItem } from "../../ShortcutListItem";
import { CloseProjectListItem } from "./CloseProjectListItem";
import { ExportImageListItem } from "./ExportImageListItem";
import { ExportImageModal } from "./ExportImageModal";
import { OpenProjectListItem } from "./OpenProjectListItem";
import { SaveProjectListItem } from "./SaveProjectListItem";

export const FileMenuButton = observer(() => {
  const [isOpenExportImageModal, setIsOpenExportImageModal] = useState(false);

  return (
    <>
      <MenuBarButton
        content={
          <>
            <OpenProjectListItem />
            <SaveProjectListItem />
            <CloseProjectListItem />
            <ShortcutListItem
              as={MenuBarItem}
              shortcut="⌘+E"
              onClick={() => setIsOpenExportImageModal(true)}
            >
              Export Image
            </ShortcutListItem>
            <ExportImageListItem />
          </>
        }
      >
        File
      </MenuBarButton>
      {isOpenExportImageModal && (
        <ExportImageModal
          open={isOpenExportImageModal}
          onClose={() => setIsOpenExportImageModal(false)}
        />
      )}
    </>
  );
});
