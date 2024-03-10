import { makeAutoObservable } from "mobx";

export class View {
  x = 0;
  y = 0;
  scale = 1;
  constructor(x: number, y: number, scale: number) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    makeAutoObservable(this);
  }
}
