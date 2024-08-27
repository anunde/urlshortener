import { inject, injectable } from "inversify";
import { DatabaseService } from "../config/database";
import { TYPES } from "../types";

@injectable()
export class SequentialModel {
    name: string;
    value: number;
    private databaseService: DatabaseService;

    constructor(
        @inject(DatabaseService) databaseService: DatabaseService,
        @inject(TYPES.String) name: string, // Passed by factory
        @inject(TYPES.String) value: number // Passed by factory
    ) {
        this.databaseService = databaseService;
        this.name = name;
        this.value = value;
    }

    async getSequential(name: string): Promise<number> {
        const db = this.databaseService.getDB();
        const sequential = await db.collection<SequentialModel>('sequentials').findOne({ name });
        return sequential ? sequential.value : 0;
    }

    async updateSequential(name: string, value: number): Promise<void> {
        const db = this.databaseService.getDB();
        await db.collection<SequentialModel>('sequentials').updateOne(
            { name },
            { $set: { value } },
            { upsert: true }
        );
    }
}
