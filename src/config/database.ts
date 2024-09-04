import { inject, injectable } from "inversify";
import { Db, Document, MongoClient } from "mongodb";
import { TYPES } from "../types";

@injectable()
export class DatabaseService {
  private db!: Db;
  private client: MongoClient;
  //   uri = process.env.MONGODB_URL as string; Santi: Esta propiedad ya no hace falta porque ya viene de la instancia de MongoClient
  dbName = process.env.DB_NAME as string;

  // Santi: Inyección de dependencia de MongoClient
  constructor(@inject(TYPES.MongoClient) mongoClient: MongoClient) {
    this.client = mongoClient;
    this.connectDB();
    this.db = this.client.db(this.dbName);
  }

  public async connectDB() {
    if (this.db) {
      return this.db;
    }
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  }

  public getDB(): Db {
    return this.db;
  }

  public async getCollection<T extends Document>(name: string): Promise<any> {
    return this.db.collection<T>(name);
  }
}
