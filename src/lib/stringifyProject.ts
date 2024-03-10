import { Project } from "../models/Project";

export function stringifyProject(project: Project) {
  return JSON.stringify(
    project,
    (_, value) => {
      if (value instanceof HTMLElement) return undefined;
      return value;
    },
    2,
  );
}
