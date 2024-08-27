import EventEmitter from "events";

export class AccessEvent {
    private emitter = new EventEmitter();
    public EVENT_NAME = 'urlAccessed';

    emitEvent(shortUrl: string) {
        this.emitter.emit(this.EVENT_NAME, { shortUrl });
    }

    onEvent(listener: (data: { shortUrl: string }) => void) {
        this.emitter.on(this.EVENT_NAME, listener);
    }
}
