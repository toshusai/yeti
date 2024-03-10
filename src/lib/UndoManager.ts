import { CustomEventTarget } from "./CustomEventTarget";

const OperationType = {
  Add: "add",
  Remove: "remove",
  Undo: "undo",
  Redo: "redo",
  Change: "change",
};

type OperationType = "add" | "remove" | "undo" | "redo" | "change";

export class UndoManager<T = object> {
  private stack: T[] = [];
  private index = -1;
  private isUndoing = false;
  private isRedoing = false;

  public event!: CustomEventTarget<OperationType, T, (e: T) => void>;

  public static main: UndoManager = new UndoManager();

  constructor(private readonly maxStackSize = 100) {
    if (typeof document === "undefined") return;
    this.event = new CustomEventTarget();
  }

  add(f: () => T) {
    const undoubled = f();
    if (!undoubled) return;
    if (this.isUndoing || this.isRedoing) {
      return { run: () => {} };
    }
    if (this.index < this.stack.length - 1) {
      this.stack.splice(this.index + 1);
    }
    this.stack.push(undoubled);
    this.index++;
    if (this.stack.length > this.maxStackSize) {
      this.stack.shift();
      this.index--;
    }
    this.event.dispatchEvent(OperationType.Add, undoubled);
    this.event.dispatchEvent(OperationType.Change, undoubled);
  }

  undo(t: () => T) {
    if (this.index < 0) {
      return;
    }

    if (this.index === this.stack.length - 1) {
      this.stack.push(t());
    }

    this.isUndoing = true;
    const state = this.stack[this.index];
    this.event.dispatchEvent(OperationType.Undo, state);
    this.event.dispatchEvent(OperationType.Change, state);

    this.isUndoing = false;
    this.index--;
  }

  redo() {
    if (this.index >= this.stack.length - 2) {
      return;
    }
    this.isRedoing = true;
    const state = this.stack[this.index + 2];
    this.event.dispatchEvent(OperationType.Redo, state);
    this.event.dispatchEvent(OperationType.Change, state);
    this.isRedoing = false;
    this.index++;
  }
}
