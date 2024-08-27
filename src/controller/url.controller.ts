import { inject, injectable } from "inversify";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { IdGeneratorService } from "../services/id-generator.service";
import { AccessEvent } from "../event/access.event";
import { AccessListener } from "../listener/access.listener";
import { UrlModel } from "../models/url.model";
import { TYPES } from "../types";

@injectable()
export class UrlController {
    private idGeneratorService: IdGeneratorService;
    private urlModel: UrlModel;
    private accessEvent: AccessEvent;
    private accessListener: AccessListener;

    constructor(
        @inject(IdGeneratorService) idGeneratorService: IdGeneratorService,
        @inject(UrlModel) urlModel: UrlModel,
        @inject(AccessEvent) accessEvent: AccessEvent,
        @inject(AccessListener) accessListener: AccessListener
    ) {
        this.idGeneratorService = idGeneratorService;
        this.urlModel = urlModel;
        this.accessEvent = accessEvent;
        this.accessListener = accessListener;
        this.accessEvent.onEvent(this.accessListener.subscribe.bind(this.accessListener));
    }

    async shortenUrl(c: Context): Promise<Response> {
        try {
            const { longUrl } = await c.req.json();

            const id = await this.idGeneratorService.generateId();

            const url = await this.urlModel.save(id, longUrl);

            return c.json({ shortUrl: `${process.env.BASE_URL}/${url.shortUrl}` });

        } catch (error) {
            return c.json({ error: "Server error" }, 500);
        }
    }

    async getLongUrl(c: Context): Promise<Response> {

        try {
            const shortUrl = c.req.param('shortUrl');
            
            const url = await this.urlModel.getByShortUrl(shortUrl);

            if (url === null) {
                throw new HTTPException(404, { message: 'URL not found' });
            }
    
            this.accessEvent.emitEvent(url.shortUrl);

            return c.redirect(url.longUrl, 302);
            
        } catch (error) {
            if (error instanceof HTTPException) {
                return c.json({ error: error.message }, error.status);
            }
            return c.json({ message: "Server error" }, 500);
        }
    }
}
