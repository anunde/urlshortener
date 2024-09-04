import { SequentialModel } from "./models/sequential.model";

export interface SequentialModelFactory {
    (name: string, value: number): SequentialModel;
}

export interface IMongoService {
    findOne(query: any): Promise<any>;
    find(query: any): Promise<any[]>;
    insertOne(document: any): Promise<any>;
    updateOne(query: any, update: any): Promise<any>;
    deleteOne(query: any): Promise<any>;
  }
  