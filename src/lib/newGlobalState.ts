import { GlobalState } from "../models/GlobalState";
import { initialEditorState } from "./initialEditorState";
import { initialProject } from "./initialProject";

export function newGlobalState(): GlobalState {
  return {
    project: initialProject(),
    editorState: initialEditorState(),
    vCanvas: null,
  };
}
