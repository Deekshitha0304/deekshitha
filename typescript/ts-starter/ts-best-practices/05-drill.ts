type Events = {
  "user:updated": {
    id: string;
    newName: string;
  };

  "user:deleted": {
    id: string;
  };
};

class EventBus<E extends Record<string, any>> {
  private listeners: {
    [K in keyof E]?: Array<(payload: E[K]) => void>;
  } = {};

  on<K extends keyof E>(event: K, handler: (payload: E[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(handler);
  }

  emit<K extends keyof E>(event: K, payload: E[K]) {
    this.listeners[event]?.forEach(handler => handler(payload));
  }
}


const bus = new EventBus<Events>();

bus.on("user:updated", (payload) => {
  console.log("User updated:", payload.id, payload.newName);
});

bus.emit("user:updated", {
  id: "123",
  newName: "Alicia"
});