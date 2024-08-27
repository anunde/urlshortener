import { SequentialModel } from "./models/sequential.model";

export interface SequentialModelFactory {
    (name: string, value: number): SequentialModel;
}