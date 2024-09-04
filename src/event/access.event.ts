import EventEmitter from "events";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";

@injectable()
export class AccessEvent {
    private emitter = new EventEmitter();
    public eventName: string;

    constructor(
        @inject(TYPES.EventName) eventName: string
    ) {
        this.eventName = eventName;
    }

    emitEvent(shortUrl: string) {
        this.emitter.emit(this.eventName, { shortUrl });
    }

    onEvent(listener: (data: { shortUrl: string }) => void) {
        this.emitter.on(this.eventName, listener);
    }
}
