import { SliderNumberField } from "@toshusai/cmpui";
import React from "react";

export function LabeledSliderNumberField({
  label,
  value,
  onChangeValue,
  ...props
}: {
  label: string;
  value: number[];
  onChangeValue: (value: number[]) => void;
} & React.ComponentProps<typeof SliderNumberField>) {
  return (
    <div className="flex gap-8 items-center w-full">
      <SliderNumberField
        label={label}
        numToString={(value) => value.toFixed(2)}
        value={value}
        className="w-full"
        onChangeValue={onChangeValue}
        {...props}
      />
    </div>
  );
}
