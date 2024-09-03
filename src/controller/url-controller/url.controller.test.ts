import { container } from "../../config/inversify.config";
import { UrlController } from "./url.controller";

let urlController;

describe('UrlController', () => {
    beforeAll(() => {
        urlController = container.get<UrlController>(UrlController);
    });

    it('to pass', () => {
        expect(true).toBe(true)
    })


});