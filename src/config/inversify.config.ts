import * as inversify from 'inversify';
import { DatabaseService } from './database';
import { SequentialModel } from '../models/sequential.model';
import { UrlModel } from '../models/url.model';
import { AccessListener } from '../listener/access.listener';
import { UrlController } from '../controller/url.controller';
import { IdGeneratorService } from '../services/id-generator.service';
import { TYPES } from '../types';

const container = new inversify.Container();
container.bind<DatabaseService>(TYPES.DatabaseService).toSelf();
container.bind<SequentialModel>(TYPES.SequentialModel).toSelf();
container.bind<UrlModel>(TYPES.UrlModel).toSelf();
container.bind<AccessListener>(TYPES.AccessListener).toSelf();
container.bind<UrlController>(TYPES.UrlController).toSelf();
container.bind<IdGeneratorService>(TYPES.IdGeneratorService).toSelf();
container.bind<inversify.Factory<UrlController>>(TYPES.UrlModelFactory)
    .toFactory<UrlController>((context) => {
        return (urlModel: UrlModel) => {
            let urlController = context.container.get<UrlController>(TYPES.UrlController);
            urlController.urlModel = urlModel;
            return urlController;
        };
    });


export { container };