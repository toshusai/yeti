import { TextInput } from "@toshusai/cmpui";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useSelectedLayers } from "../../lib/useSelectedLayers";

export const NameInspector = observer(function NameInspector() {
  const selectedLayers = useSelectedLayers();
  if (selectedLayers.length === 0) return null;
  return (
    <TextInput
      label="name"
      className="w-full"
      value={selectedLayers.length === 1 ? selectedLayers[0].name : "mixed"}
      onChange={action((e) => {
        selectedLayers.forEach((layer) => {
          layer.name = e.currentTarget.value;
        });
      })}
    />
  );
});
