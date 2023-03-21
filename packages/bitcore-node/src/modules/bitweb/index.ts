import { BaseModule } from '..';
import { BTEStateProvider } from '../../providers/chain-state/bte/bte';
import { VerificationPeer } from '../bitcoin/VerificationPeer';
import { BitwebP2PWorker } from './p2p';

export default class BTEModule extends BaseModule {
  constructor(services) {
    super(services);
    services.Libs.register('BTE', 'bitcore-lib-bte', 'bitcore-p2p');
    services.P2P.register('BTE', BitwebP2PWorker);
    services.CSP.registerService('BTE', new BTEStateProvider());
    services.Verification.register('BTE', VerificationPeer);
  }
}
