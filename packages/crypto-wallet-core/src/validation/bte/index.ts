import { IValidation } from '..';
const BitcoreBte = require('bitcore-lib-bte');

export class BteValidation implements IValidation {
  validateAddress(network: string, address: string): boolean {
    const Address = BitcoreBte.Address;
    return Address.isValid(address, network);
  }

  validateUri(addressUri: string): boolean {
    // Check if the input is a valid uri or address
    const URICash = BitcoreBte.URI;
    // Bip21 uri
    return URICash.isValid(addressUri);
  }
}
