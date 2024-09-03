import * as inversify from "inversify";
import { DatabaseService } from "./database";
import { SequentialModel } from "../models/sequential.model";
import { UrlModel } from "../models/url.model";
import { AccessListener } from "../listener/access.listener";
import { UrlController } from "../controller/url-controller/url.controller";
import { IdGeneratorService } from "../services/id-generator.service";
import { TYPES } from "../types";
import { AccessEvent } from "../event/access.event";

const container = new inversify.Container();
container.bind<string>(TYPES.String).toDynamicValue((value) => {
  return "string";
});

container.bind<string>(TYPES.EventName).toConstantValue("urlAccessed"); // Santi: Se agrega el binding de EventName al valor constante "urlAccessed"
container.bind<DatabaseService>(DatabaseService).to(DatabaseService);
container.bind<UrlController>(UrlController).to(UrlController);
container.bind<SequentialModel>(SequentialModel).to(SequentialModel);
container.bind<UrlModel>(UrlModel).to(UrlModel);
container.bind<AccessListener>(AccessListener).to(AccessListener);
container.bind<AccessEvent>(AccessEvent).to(AccessEvent);
container.bind<IdGeneratorService>(IdGeneratorService).to(IdGeneratorService);

// Santi: Inyección de instancia de SequentialModel
container
  .bind<SequentialModel>(TYPES.SequentialModelFactory)
  .toFactory<SequentialModel, [string, number]>(
    (context: inversify.interfaces.Context) => {
      return (name: string, value: number) => {
        const databaseService = context.container.get<DatabaseService>(
          TYPES.DatabaseService
        );
        return new SequentialModel(databaseService, name, value);
      };
    }
  );

export { container };
