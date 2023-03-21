import { BTCStateProvider } from '../btc/btc';

export class BTEStateProvider extends BTCStateProvider {
  constructor(chain: string = 'BTE') {
    super(chain);
  }
}
