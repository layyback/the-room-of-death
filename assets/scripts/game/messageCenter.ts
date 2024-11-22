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
  nextLevel
}

class MessageCenter {
  subscribers: Map<MessageType, Set<Function>> = new Map();
  constructor() {}

  subscribe(type: MessageType, callback: Function, context) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, new Set());
    }
    this.subscribers.get(type)?.add(callback.bind(context));
  }

  unsubscribe(type: MessageType, callback: Function) {
    if (this.subscribers.has(type)) {
      this.subscribers.get(type)?.delete(callback);
    }
  }

  publish(type: MessageType, data: unknown) {
    if (this.subscribers.has(type)) {
      this.subscribers.get(type)?.forEach(callback => {
        callback(data);
      });
    }
  }
}

const messageCenter = new MessageCenter();
export { messageCenter, MessageType };
