import { injectable } from "inversify";
import { Db, Document, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URL as string;
const dbName = process.env.DB_NAME as string;

if (!uri) {
    throw new Error("Falta la variable de entorno MONGODB_URI");
}

if (!dbName) {
    throw new Error("Falta la variable de entorno DB_NAME");
}

const client = new MongoClient(uri);

@injectable()
export class DatabaseService {
    private db!: Db;

    constructor() {
        this.connectDB();
    }

    public async connectDB() {
        try {
            await client.connect();
            this.db = client.db(dbName);
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
