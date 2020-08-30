import Queue from "queue";

export default class QueueService {

  constructor() {
    this.queue = Queue({
      autostart: true,
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  performAction(action) {
    this.queue.push((cb) => {
      try {
        action();
      } catch (error) {
        console.log('QueueService error:', error);
      }
      cb();
    });
  }
}
