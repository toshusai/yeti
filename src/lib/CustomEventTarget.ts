export class CustomEventTarget<K extends string, A, F extends (e: A) => void> {
  constructor(private readonly event = new EventTarget()) {}

  map: Map<number, [string, EventListenerOrEventListenerObject]> = new Map();
  id = 0;

  addEventListener(type: K, listener: F) {
    const f: EventListenerOrEventListenerObject = (e) => {
      if (e instanceof CustomEvent && e.detail) {
        listener(e.detail);
      }
    };
    this.map.set(this.id, [type, f]);
    this.event.addEventListener(type, f);
    return this.id++;
  }

  removeEventListener(id: number) {
    const value = this.map.get(id);
    if (value) {
      const [type, f] = value;
      this.event.removeEventListener(type, f);
    }
  }

  dispatchEvent(type: string, arg: A) {
    this.event.dispatchEvent(new CustomEvent(type, { detail: arg }));
  }
}
