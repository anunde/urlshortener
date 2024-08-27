import { inject, injectable } from 'inversify';
import { networkInterfaces } from 'os';
import { SequentialModel } from '../models/sequential.model';
import { TYPES } from '../types';

@injectable()
export class IdGeneratorService {
    private machineId: string = '';
    private sequentialCounter: number = 0;
    private sequential: SequentialModel;

    constructor(@inject(SequentialModel) sequential: SequentialModel) {
        this.sequential = sequential;
    }

    async generateId(): Promise<string> {
        if (!this.machineId) {
            const nets = networkInterfaces();
            let macAddress = '';

            for (const name of Object.keys(nets)) {
                for (const net of nets[name]!) {
                    if (!net.internal && net.mac !== '00:00:00:00:00:00') {
                        macAddress = net.mac.replace(/:/g, '');
                        break;
                    }
                }
                if (macAddress) break;
            }

            this.machineId = macAddress;
        }

        if (this.sequentialCounter === 0) {
            const sequential = await this.sequential.getSequential('unique_id_sequential');
            this.sequentialCounter = sequential === 0 ? sequential : sequential + 10;
        }

        this.sequentialCounter += 1;

        if (this.sequentialCounter % 10 === 0) {
            await this.sequential.updateSequential('unique_id_sequential', this.sequentialCounter);
        }

        return `${this.machineId}${this.sequentialCounter}`;
    }
}
