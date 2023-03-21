const BitcoreLibBte = require('bitcore-lib-bte');
import { AbstractBitcoreLibDeriver } from '../btc';
export class BteDeriver extends AbstractBitcoreLibDeriver {
  bitcoreLib = BitcoreLibBte;
}
