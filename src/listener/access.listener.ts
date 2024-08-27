import { inject, injectable } from "inversify";
import { AccessEvent } from "../event/access.event";
import { UrlModel } from "../models/url.model";
import { TYPES } from "../types";

@injectable()
export class AccessListener {
    private urlModel: UrlModel;

    constructor(
        @inject(UrlModel) urlModel: UrlModel,
        @inject(AccessEvent) accessEvent: AccessEvent
    ) {
        this.urlModel = urlModel;
        accessEvent.onEvent(this.subscribe.bind(this));
    }

    async subscribe(data: { shortUrl: string }) {
        const url = await this.urlModel.getByShortUrl(data.shortUrl);
        if (url) {
            await this.urlModel.addAccessCount(data.shortUrl);
        }
    }
}
