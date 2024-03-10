import { Asset } from "./Asset";
import { Layer } from "./Layer";

export type Project = {
  id: string;
  path?: string;
  name: string;
  layers: Layer[];
  assets: Asset[];

  canvasWidth: number;
  canvasHeight: number;
};
