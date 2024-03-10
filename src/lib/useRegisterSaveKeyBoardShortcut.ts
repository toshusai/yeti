import { action } from "mobx";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "./GlobalStateContext";
import { UndoManager } from "./UndoManager";
import { loadProjectFromJson } from "./loadProjectFromJson";
import { useUndo } from "./useUndo";

export function useRegisterSaveKeyBoardShortcut() {
  const globalState = useContext(GlobalStateContext);
  const { start, commit } = useUndo();
  useEffect(() => {
    const onKeyDown = action((e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") return;
      if (e.key === "t") {
        globalState.editorState.toolMode = "text";
      } else if (e.key === "v") {
        globalState.editorState.toolMode = "default";
      } else if (e.key === "m") {
        globalState.editorState.toolMode = "pan";
      } else if (e.key === "Delete" || e.key === "Backspace") {
        start();
        globalState.editorState.selectedLayerIds.forEach((id) => {
          globalState.project.layers = globalState.project.layers.filter(
            (layer) => {
              return layer.id !== id;
            },
          );
        });
        commit();
      }
      if (e.key === "z" && e.metaKey) {
        if (e.shiftKey) {
          UndoManager.main.redo();
        } else {
          UndoManager.main.undo(() => {
            return JSON.parse(
              JSON.stringify(
                globalState.project,
                (_, value) => {
                  if (value instanceof HTMLElement) return undefined;
                  return value;
                },
                2,
              ),
            );
          });
        }
      }
    });
    const undoId = UndoManager.main.event.addEventListener(
      "undo",
      action((data) => {
        globalState.project = loadProjectFromJson(JSON.stringify(data));
      }),
    );
    const redoId = UndoManager.main.event.addEventListener(
      "redo",
      action((data) => {
        globalState.project = loadProjectFromJson(JSON.stringify(data));
      }),
    );
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      UndoManager.main.event.removeEventListener(undoId);
      UndoManager.main.event.removeEventListener(redoId);
    };
  }, [commit, globalState, start]);
}
