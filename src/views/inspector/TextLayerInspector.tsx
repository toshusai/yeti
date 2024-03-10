import { ColorInput, Select, TextInput } from "@toshusai/cmpui";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GlobalStateContext } from "../../lib/GlobalStateContext";
import { useUndo } from "../../lib/useUndo";
import { TextEffect } from "../../models/TextEffect";
import { FontRender } from "./FontRender";
import { Label } from "./Label";
import { LabeledSliderNumberField } from "./LabeledSliderNumberField";

export const TextLayerInspector = observer(
  ({
    effects,
  }: {
    effects: TextEffect[];
  }) => {
    const { project } = useContext(GlobalStateContext);
    const { start, commit } = useUndo();
    const fonts = project.assets
      .filter((a) => a.type === "font")
      .map((font) => ({
        label: font.name,
        value: font.id,
        family: font.name,
        url: font.url,
      }));

    const isMixedFont = effects.some(
      (effect) => effect.assetId !== effects[0].assetId,
    );

    if (isMixedFont) {
      fonts.unshift({
        label: "mixed",
        value: "mixed",
        family: "mixed",
        url: "",
      });
    }

    return (
      <>
        <Label text="Text" />
        <TextInput
          id={`${effects.map((l) => l.id).join("_")}-text`}
          label="text"
          className="w-full"
          value={effects.length === 1 ? effects[0].text : "mixed"}
          onChange={action((e) => {
            effects.forEach((layer) => {
              layer.text = e.currentTarget.value;
            });
          })}
        />

        <LabeledSliderNumberField
          label="fontSize"
          value={effects.map((layer) => layer.fontSize)}
          onChangeValue={action((value) => {
            effects.forEach((layer, i) => {
              layer.fontSize = value[i];
            });
          })}
          onStart={start}
          onEnd={commit}
        />

        <Select
          label="font"
          value={isMixedFont ? "mixed" : effects[0].assetId}
          onChange={action((id) => {
            start();
            effects.forEach((layer) => {
              layer.assetId = id;
            });
            commit();
          })}
          className="w-full"
        >
          {fonts.map((font) => (
            <FontRender
              family={font.family}
              url={font.url}
              value={font.value}
              key={font.value}
            >
              {font.label}
            </FontRender>
          ))}
        </Select>

        <ColorInput
          label="color"
          value={effects[0].color}
          onStart={start}
          onEnd={commit}
          onChange={action((hsva) => {
            effects.forEach((layer) => {
              layer.color = hsva;
            });
          })}
        />
      </>
    );
  },
);
