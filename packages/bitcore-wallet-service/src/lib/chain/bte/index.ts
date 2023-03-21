import { BitcoreLibBte } from 'crypto-wallet-core';
import _ from 'lodash';
import { IChain } from '..';
import { BtcChain } from '../btc';

export class BteChain extends BtcChain implements IChain {
  constructor() {
    super(BitcoreLibBte);
  }
}
