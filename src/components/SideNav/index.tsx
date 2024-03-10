import { IconButton, Tooltip } from "@toshusai/cmpui";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useEditorState } from "../../lib/useEditorState";
import { ToolType } from "../../models/EditorState";
import { Icon } from "../Icon";

const NavButton = observer(function NavButton(props: {
  tip: string;
  icon: string;
  mode: ToolType;
}) {
  const editorState = useEditorState();
  return (
    <Tooltip content={props.tip} side="right">
      <IconButton
        onClick={action(() => {
          editorState.toolMode = props.mode;
        })}
        selected={editorState.toolMode === props.mode}
      >
        <Icon name={props.icon} filled size={16} />
      </IconButton>
    </Tooltip>
  );
});

export const SideNav = observer(function SideNav() {
  return (
    <div className="flex flex-col h-full box-border w-min-32 items-center">
      <NavButton tip="Select (V)" icon="arrow_selector_tool" mode={"default"} />
      <NavButton tip="Pan (M)" icon="pan_tool" mode={"pan"} />
      <NavButton tip="Text (T)" icon="title" mode={"text"} />
    </div>
  );
});
