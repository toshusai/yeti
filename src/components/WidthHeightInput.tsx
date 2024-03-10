import { SliderNumberField } from "@toshusai/cmpui";

export function WidthHeightInput(props: {
  width: number;
  height: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}) {
  return (
    <div className="flex flex gap-4 items-center p-8">
      <SliderNumberField
        label="Width"
        className="w-[128px]"
        value={[props.width]}
        onChangeValue={(value) => {
          props.setWidth(value[0]);
        }}
      />
      x
      <SliderNumberField
        label="Height"
        className="w-[128px]"
        value={[props.height]}
        onChangeValue={(value) => {
          props.setHeight(value[0]);
        }}
      />
    </div>
  );
}
