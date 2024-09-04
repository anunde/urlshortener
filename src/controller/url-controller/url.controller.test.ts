import "reflect-metadata";
import { UrlController } from "./url.controller";
import { Container } from "inversify";
import { MockMongoService } from "../../mocks/mongo.mock";
import { IdGeneratorService } from "../../services/id-generator.service";
import { SequentialModel } from "../../models/sequential.model";
import { UrlModel } from "../../models/url.model";
import { DatabaseService } from "../../config/database";
import { MongoClient } from "mongodb";
import { TYPES } from "../../types";
import { AccessEvent } from "../../event/access.event";
import { AccessListener } from "../../listener/access.listener";

// SANTI: Creación de un contenedor para los tests
function createContainer() {
  const container = new Container();
  container.bind<string>(TYPES.String).toDynamicValue((value) => {
    return "string";
  });

  container.bind<string>(TYPES.EventName).toConstantValue("urlAccessed");

  container.bind<AccessEvent>(AccessEvent).to(AccessEvent);
  container.bind<AccessListener>(AccessListener).to(AccessListener);
  container.bind<IdGeneratorService>(IdGeneratorService).to(IdGeneratorService);
  container.bind<DatabaseService>(DatabaseService).to(DatabaseService);
  container.bind<UrlModel>(UrlModel).to(UrlModel);
  container.bind<SequentialModel>(SequentialModel).to(SequentialModel);
  container.bind<UrlController>(UrlController).to(UrlController);

  // Santi: Inyección de dependencia de MongoClient (libreria terceros)
  // Santi: Revisa MockMongoService para que veas la implementación del mock
  container
    .bind<MongoClient>(TYPES.MongoClient)
    .toDynamicValue(() => {
      const client = new MockMongoService() as unknown as MongoClient;
      return client;
    })
    .inSingletonScope();

  return container;
}

describe("UrlController", () => {
  let urlController;
  let container: Container;
  beforeAll(() => {
    container = createContainer();
    urlController = container.get<UrlController>(UrlController);
  });

  it("to pass", () => {
    expect(true).toBe(true);
  });
});
