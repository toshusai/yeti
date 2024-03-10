import { Effect } from "./Effect";

export type Layer = {
  id: string;
  name: string;
  effects: Effect[];
};
