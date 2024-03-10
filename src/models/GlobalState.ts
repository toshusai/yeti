import { EditorState } from "./EditorState";
import { Project } from "./Project";
import { VCanvas } from "./VCanvas";

export type GlobalState = {
  project: Project;
  editorState: EditorState;
  vCanvas: VCanvas | null;
};
