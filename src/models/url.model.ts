import { inject, injectable } from "inversify";
import { DatabaseService } from "../config/database";
import { TYPES } from "../types";

export interface IUrlModel {
    id: string;
    longUrl: string;
    shortUrl: string;
    createdAt: Date;
    accessCount: number;
}

@injectable()
export class UrlModel {
    id: string;
    longUrl: string;
    shortUrl: string;
    createdAt: Date;
    accessCount: number;

    constructor(
        @inject(TYPES.DatabaseService) private databaseService: DatabaseService,
        id: string,
        longUrl: string
    ) {
        this.id = id;
        this.longUrl = longUrl;
        this.shortUrl = this.encodeBase62(this.id);
        this.createdAt = new Date();
        this.accessCount = 0;
    }

    async save(): Promise<void> {
        const db = this.databaseService.getDB();
        await db.collection<IUrlModel>('urls').insertOne(this.toDocument());
    }

    async getByShortUrl(
        shortUrl: string
    ): Promise<IUrlModel | null> {
        const db = this.databaseService.getDB();
        return db.collection<IUrlModel>('urls').findOne({ shortUrl });
    }

    async addAccessCount(
        shortUrl: string
    ): Promise<void> {
        const db = this.databaseService.getDB();
        await db.collection('urls').updateOne(
            { shortUrl },
            { $inc: { accessCount: 1 } }
        );
    }

    private encodeBase62(id: string): string {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let num = BigInt(`0x${id}`);
        let base62 = '';

        while (num > 0) {
            const remainder = num % BigInt(62);
            base62 = chars[Number(remainder)] + base62;
            num = num / BigInt(62);
        }

        return base62 || '0';
    }

    private toDocument(): IUrlModel {
        return {
            id: this.id,
            longUrl: this.longUrl,
            shortUrl: this.shortUrl,
            createdAt: this.createdAt,
            accessCount: this.accessCount
        };
    }
}
