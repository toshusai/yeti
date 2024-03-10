import { Project } from "../models/Project";
import { uuid } from "./uuid";

export function initialProject(): Project {
  return {
    id: uuid(),
    name: "project",
    layers: [],
    assets: [{ id: "Arial", type: "font", name: "Arial", url: "" }],
    canvasHeight: 540,
    canvasWidth: 960,
  };
}
