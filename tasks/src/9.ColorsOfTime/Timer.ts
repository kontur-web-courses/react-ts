type Handler = (time: Date) => void;

export default class Timer {
  tickInterval: number | null = null;
  handlers: Handler[] = [];

  addUpdated(handler: Handler) {
    this.handlers.push(handler);
    if (!this.tickInterval) {
      this.tickInterval = window.setInterval(() => {
        const currentTime = new Date();
        for (const handler of this.handlers) {
          handler(currentTime);
        }
      }, 1000);
    }
  }

  removeUpdated(handler: Handler) {
    this.handlers = this.handlers.filter(h => h !== handler);
    if (this.handlers.length === 0 && this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  }
}
