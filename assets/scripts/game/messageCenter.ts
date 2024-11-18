enum MessageType {
  Move,
  onMove,
  onAttacked,
  InitPlayer,
  InitEnemy
}

class MessageCenter {
  subscribers: Map<MessageType, Set<Function>> = new Map();
  constructor() {}

  subscribe(type: MessageType, callback: Function, context) {
    console.log("消息中心订阅了：", type);

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
    console.log("消息中心发布了：", type, data);

    if (this.subscribers.has(type)) {
      this.subscribers.get(type)?.forEach(callback => {
        callback(data);
      });
    }
  }
}

const messageCenter = new MessageCenter();
export { messageCenter, MessageType };
