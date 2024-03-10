import { HSVA } from "@toshusai/cmpui";

export type TextEffect = {
  id: string;
  type: "text";
  text: string;
  fontSize: number;
  color: HSVA;
  assetId: string;
};
