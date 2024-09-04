import { IMongoService } from "../interfaces";

export class MockMongoService implements IMongoService {
  // Mock the methods you need to return test data
  async findOne(query: any): Promise<any> {
    return { _id: "mockedId", url: "https://example.com" };
  }
  async find(query: any): Promise<any[]> {
    return [{ _id: "mockedId", url: "https://example.com" }];
  }

  async insertOne(document: any): Promise<any> {
    return { _id: "mockedId", url: "https://example.com" };
  }

  async updateOne(query: any, update: any): Promise<any> {
    return { _id: "mockedId", url: "https://example.com" };
  }

  async deleteOne(query: any): Promise<any> {
    return { _id: "mockedId", url: "https://example.com" };
  }
  
  connect(): Promise<void> {
    return Promise.resolve();
  }

  db(): any {
    return {
      collection: () => this
    };
  }

  // Add other mocked methods as needed
}
