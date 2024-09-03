import { inject, injectable } from 'inversify';
import { networkInterfaces } from 'os';

@injectable()
export class IdGeneratorService {
    private machineId: string = '';

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

        return `${this.machineId}`;
    }
}
