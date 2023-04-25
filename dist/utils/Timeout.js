export default class Timeout {
    id;
    handler;
    startTime;
    timeLeft;
    constructor(handler, time) {
        this.handler = handler;
        this.id = setTimeout(handler, time);
        this.startTime = Date.now();
        this.timeLeft = time;
    }
    clear() {
        clearTimeout(this.id);
    }
    pause() {
        const elapsedTime = Date.now() - this.startTime;
        this.timeLeft = this.timeLeft - elapsedTime;
        this.clear();
    }
    continue() {
        this.clear();
        this.id = setTimeout(this.handler, this.timeLeft);
        this.startTime = Date.now();
    }
}
//# sourceMappingURL=Timeout.js.map