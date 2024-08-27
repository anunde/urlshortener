import { Hono } from "hono"

import { UrlController } from "../controller/url.controller";
import { container } from "../config/inversify.config";

export class Router {

    //Solo un conjunto de rutas
    static register(app: Hono) {
        const urlController = container.get<UrlController>(UrlController);
        //Saber si invocar o referenciar una función depende de si la invocación la vas a hacer tu o la función donde la estas pasando
        app.get('/:shortUrl', urlController.getLongUrl)
        app.post('/', urlController.shortenUrl);
    }
}