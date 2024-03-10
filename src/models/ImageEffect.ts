export type ImageEffect = {
  type: "image";
  width: number;
  height: number;
  assetId: string;

  element?: HTMLImageElement;
};
