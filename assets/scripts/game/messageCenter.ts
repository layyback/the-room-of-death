enum MessageType {
  Move,
  onMove,
  onAttacked,
  onPlayerAttacked,
  InitPlayer,
  InitEnemy,
  InitDoor,
  InitSpike,
  InitBurst,
  onAllEnemyDead,
  nextLevel,
  onShake,
  onFade
}

class MessageCenter {
  subscribers: Map<MessageType, Set<Function>> = new Map();
  boundCallbacks: Map<string, Function> = new Map();
  constructor() {}

  subscribe(type: MessageType, callback: Function, context) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    const boundCallback = callback.bind(context);
    this.subscribers.get(type)?.add(boundCallback);

    const key = this.getCallbackKey(callback, context);
    this.boundCallbacks.set(key, boundCallback);
  }

  unsubscribe(type: MessageType, callback: Function, context) {
    const key = this.getCallbackKey(callback, context);
    const boundCallback = this.boundCallbacks.get(key);
    if (this.subscribers.has(type) && boundCallback) {
      this.subscribers.get(type)?.delete(boundCallback);
      this.boundCallbacks.delete(key);
    }
  }

  publish(type: MessageType, data: unknown) {
    if (this.subscribers.has(type)) {
      this.subscribers.get(type)?.forEach(callback => {
        callback(data);
      });
    }
  }

  removeAllSubscribers() {
    this.subscribers.clear();
    this.boundCallbacks.clear();
  }

  private getCallbackKey(callback: Function, context: any): string {
    return `${callback.toString()}_${context._id}`;
  }
}

const messageCenter = new MessageCenter();
export { messageCenter, MessageType };
