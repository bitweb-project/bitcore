'use strict';

/* jshint maxstatements: 30 */

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

var bitcore = require('..');
var PublicKey = bitcore.PublicKey;
var Address = bitcore.Address;
var Script = bitcore.Script;
var Networks = bitcore.Networks;

describe('Witness Address', function() {

  var pubkeyhash = Buffer.from('2a9540f5cd929bf742d16b4e1bf1b0e874c907c9', 'hex');
  var str = 'web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z';
  var wrappedStr = 'DQ7YBW4mJPAri1ziGi16UbFvDvjMFkSZve';
  var buf = Buffer.from(str, 'utf8');

  it('should throw an error because of bad network param', function() {
    (function() {
      return new Address(P2WPKHLivenet[0], 'main', 'witnesspubkeyhash');
    }).should.throw('Second argument must be "livenet" or "testnet".');
  });

  it('should throw an error because of bad type param', function() {
    (function() {
      return new Address(P2WPKHLivenet[0], 'livenet', 'pubkey');
    }).should.throw('Third argument must be "pubkeyhash", "scripthash", "witnesspubkeyhash", "witnessscripthash", or "taproot".');
  });

  // livenet valid
  var P2WPKHLivenet = [
    'web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z',
    'web1q9225pawtn2dlwsk3dd8phudsap6vjp7fjnjsxg',
    'web1q9225pewdn2dlwsk3dd8phudsap6vjp7flculue',
    'web1q9225rawdn2dlwsk3dd8phudsap6vjp7fs2s28a',
    '    web1q92z5pawdn2dlwsk3dd8phudsap6vjp7flwmrt7   \t\n'
  ];

  // livenet p2wsh
  var P2WSHLivenet = [
    'web1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0ycvsuee008',
    'web1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0ycvqfc3h65',
    'web1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0yctsccamh4',
    'web1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0yctqde4rzx',
    '\t \nweb1qr225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0yctq6a785w \r'
  ];

  // testnet p2Wsh
  var P2WSHTestnet = [
    'tb1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0ycvs6pluck',
    'tb1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0ycvq0qhyd9',
    'tb1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0ycts7qmgqy',
    'tb1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0yctqtpns4h'
  ];

  //livenet bad checksums
  var badChecksums = [
    'web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs45370',
    'web1q9225pawtn2dlwsk3dd8phudsap6vjp7fjnjsx0',
    'web1q9225pewdn2dlwsk3dd8phudsap6vjp7flculu0',
    'web1q9225rawdn2dlwsk3dd8phudsap6vjp7fs2s280'
  ];

  // incorrect witness version
  var incorrectWitnessVersions = [
    ['tb1lnuql3d5r8fpkezf9jyvfjcczrwtfjndksaquvfr782uf7xvmpeuq3dyfg2', 'testnet', 'taproot'], // version 31
  ];


  // incorrect witness encoding
  var incorrectWitnessEncoding = [
    ['web1p9225pawdj2dlwsk3dd8phudsap6vjp7fmtr6nf', 'livenet', 'witnesspubkeyhash'],
    ['web1p9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0ycvsrjf2je', 'livenet', 'witnesspubkeyhash']
  ];
  
  //testnet valid
  var P2WPKHTestnet = [
    'tb1q5lrlddcjejvu0qyx0f5fg59zj89danlxtt058g',
    'tb1qrqsut4l6payxr9zda6s74jsgupc096t40k234h',
    'tb1qkjxpx3kzdqj3qydxfsd88rj8vwzy2ry9luturg',
    'tb1qa38kkwah0mncpn29j6xlzv4xa5m3wrr0juyt2j'
  ];


  // taproot addresses generated using instructions here: https://bitcoin.stackexchange.com/questions/108006/how-to-make-a-taproot-transaction-with-bitcoin-cli
  // "desc" used in descriptor.txt: "tr([8868ab13/86'/1'/0']tprv8ZgxMBicQKsPe7EVJZjbgFcxVx51KrdMU8MicmR6KBbtTYhuzzdFK8Q7B6GXaTJxaAfpw1gF1dXDjg1DD3K8dchjMVeS214MSFj1bA5iAnH/0/*)#l425xznh"

  // testnet taproot valid
  var P2TRTestnet = [
    'tb1pnuql3d5r8fpkezf9jyvfjcczrwtfjndksaquvfr782uf7xvmpeuqnqg5lk',
    'tb1p6qef90ncxz25pq59c0dfjfezjlk5l0fq7n3w0axh63usmtugtvhqylnyxq',
    'tb1palsux05ufcpg25al0krew5szfj03vejkqfxpz9kd26ghvruw33qq8q9ykg',
    'tb1p9g2t30jj3djsn0tlaf6en2pq5qu7vgknyhjg3n54zcmglzy2t52qemw4dy',
    'tb1pkadknwnukaxnpkg9wwp3430dd0w0shfw4f6ry3e68my0vyz3we5qh6qwhf',
    'tb1pwjhr3ttlpvshcgrwz7h4asfusyj6angdxx2yvx6q8ds08upk699s44d4ck'
  ];

  describe('validation', function() {

    it('getValidationError detects network mismatchs', function() {
      var error = Address.getValidationError('web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z', 'testnet');
      should.exist(error);
    });

    it('isValid returns true on a valid address', function() {
      var valid = Address.isValid('web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z', 'livenet');
      valid.should.equal(true);
    });

    it('isValid returns false on network mismatch', function() {
      var valid = Address.isValid('web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z', 'testnet');
      valid.should.equal(false);
    });

    it('validates correctly the P2WPKH test vector', function() {
      for (var i = 0; i < P2WPKHLivenet.length; i++) {
        var error = Address.getValidationError(P2WPKHLivenet[i]);
        should.not.exist(error);
      }
    });

    it('validates correctly the P2WSH test vector', function() {
      for (var i = 0; i < P2WSHLivenet.length; i++) {
        var error = Address.getValidationError(P2WSHLivenet[i]);
        should.not.exist(error);
      }
    });

    it('validates correctly the P2WSH testnet test vector', function() {
      for (var i = 0; i < P2WSHTestnet.length; i++) {
        var error = Address.getValidationError(P2WSHTestnet[i], 'testnet');
        should.not.exist(error);
      }
    });

    it('rejects correctly the P2WPKH livenet test vector with "testnet" parameter', function() {
      for (var i = 0; i < P2WPKHLivenet.length; i++) {
        var error = Address.getValidationError(P2WPKHLivenet[i], 'testnet');
        should.exist(error);
      }
    });

    it('validates correctly the P2WPKH livenet test vector with "livenet" parameter', function() {
      for (var i = 0; i < P2WPKHLivenet.length; i++) {
        var error = Address.getValidationError(P2WPKHLivenet[i], 'livenet');
        should.not.exist(error);
      }
    });

    it('validates correctly the P2TR testnet vector', function() {
      for (var i = 0; i < P2TRTestnet.length; i++) {
        var error = Address.getValidationError(P2TRTestnet[i], 'testnet');
        should.not.exist(error);
      }
    });

    it('should not validate if checksum is invalid', function() {
      for (var i = 0; i < badChecksums.length; i++) {
        var error = Address.getValidationError(badChecksums[i], 'livenet', 'witnesspubkeyhash');
        should.exist(error);
        error.message.should.equal('Invalid checksum for ' + badChecksums[i]);
      }
    });

    it('should not validate if wrong witness version', function() {
      for (var i = 0; i < incorrectWitnessVersions.length; i++) {
        var [address, network, type] = incorrectWitnessVersions[i];
        var error = Address.getValidationError(address, network, type);
        should.exist(error);
        error.message.should.equal('Only witness v0 and v1 addresses are supported.');
      }
    });

    it('should not validate if wrong witness encoding', function() {
      for (var i = 0; i < incorrectWitnessEncoding.length; i++) {
        var [address, network, type] = incorrectWitnessEncoding[i];
        var error = Address.getValidationError(address, network, type);
        should.exist(error);
        error.message.should.equal('Version 1+ witness address must use Bech32m checksum');
      }
    });

    it('should not validate on a network mismatch', function() {
      var error, i;
      for (i = 0; i < P2WPKHLivenet.length; i++) {
        error = Address.getValidationError(P2WPKHLivenet[i], 'testnet', 'witnesspubkeyhash');
        should.exist(error);
        error.message.should.equal('Address has mismatched network type.');
      }
      for (i = 0; i < P2WPKHTestnet.length; i++) {
        error = Address.getValidationError(P2WPKHTestnet[i], 'livenet', 'witnesspubkeyhash');
        should.exist(error);
        error.message.should.equal('Address has mismatched network type.');
      }
    });

    it('should not validate on a type mismatch', function() {
      for (var i = 0; i < P2WPKHLivenet.length; i++) {
        var error = Address.getValidationError(P2WPKHLivenet[i], 'livenet', 'witnessscripthash');
        should.exist(error);
        error.message.should.equal('Address has mismatched type.');
      }
    });

    it('testnet addresses are validated correctly', function() {
      for (var i = 0; i < P2WPKHTestnet.length; i++) {
        var error = Address.getValidationError(P2WPKHTestnet[i], 'testnet');
        should.not.exist(error);
      }
    });

    it('addresses with whitespace are validated correctly', function() {
      var ws = '  \r \t    \n web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z \t \n            \r';
      var error = Address.getValidationError(ws);
      should.not.exist(error);
      Address.fromString(ws).toString().should.equal('web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z');
    });
  });

  describe('instantiation', function() {
    it('can be instantiated from another address', function() {
      var address = Address.fromBuffer(buf);
      var address2 = new Address({
        hashBuffer: address.hashBuffer,
        network: address.network,
        type: address.type
      });
      address.toString().should.equal(address2.toString());
    });
  });

  describe('encodings', function() {

    it('should make an address from a buffer', function() {
      Address.fromBuffer(buf).toString().should.equal(str);
      new Address(buf).toString().should.equal(str);
      new Address(buf).toString().should.equal(str);
    });

    it('should make an address from a string', function() {
      Address.fromString(str).toString().should.equal(str);
      new Address(str).toString().should.equal(str);
    });

    it('should make an address using a non-string network', function() {
      Address.fromString(str, Networks.livenet).toString().should.equal(str);
    });

    it('should throw with bad network param', function() {
      (function(){
        Address.fromString(str, 'somenet');
      }).should.throw('Unknown network');
    });

    it('should error because of incorrect format for script hash', function() {
      (function() {
        return new Address.fromScriptHash('notascript', null, Address.PayToWitnessScriptHash);
      }).should.throw('Address supplied is not a buffer.');
    });

    it('should error because of incorrect type for pubkey transform', function() {
      (function() {
        return Address._transformPublicKey(Buffer.alloc(20), null, Address.PayToWitnessPublicKeyHash);
      }).should.throw('Address must be an instance of PublicKey.');
      (function() {
        return Address._transformPublicKey(Buffer.alloc(20), null, Address.PayToScriptHash);
      }).should.throw('Address must be an instance of PublicKey.');
    });

    it('should make this address from a compressed pubkey', function() {
      var pubkey = new PublicKey('0285e9737a74c30a873f74df05124f2aa6f53042c2fc0a130d6cbd7d16b944b004');
      var address = Address.fromPublicKey(pubkey, 'livenet', Address.PayToWitnessPublicKeyHash);
      address.toString().should.equal('web1qtuh205nkztchej8r84k8vna9upsjh7q84grtd8');
    });

    it('should make this wrapped address from a compressed pubkey', function() {
      var pubkey = new PublicKey('0285e9737a74c30a873f74df05124f2aa6f53042c2fc0a130d6cbd7d16b944b004');
      var address = Address.fromPublicKey(pubkey, 'livenet', Address.PayToScriptHash);
      address.toString().should.equal('DKpa6uAwqwjPPv6n3bJjtNT4xwxr617X3d');
    });

    it('should use the default network for pubkey', function() {
      var pubkey = new PublicKey('0285e9737a74c30a873f74df05124f2aa6f53042c2fc0a130d6cbd7d16b944b004');
      var address = Address.fromPublicKey(pubkey, null, Address.PayToWitnessPublicKeyHash);
      address.network.should.equal(Networks.defaultNetwork);
    });

    it('should use the default network for pubkey', function() {
      var pubkey = new PublicKey('0285e9737a74c30a873f74df05124f2aa6f53042c2fc0a130d6cbd7d16b944b004');
      var address = Address.fromPublicKey(pubkey, null, Address.PayToScriptHash);
      address.network.should.equal(Networks.defaultNetwork);
    });

    it('should fail to make an address with an uncompressed pubkey', function() {
      var pubkey = new PublicKey('0485e9737a74c30a873f74df05124f2aa6f53042c2fc0a130d6cbd7d16b944b00' +
        '4833fef26c8be4c4823754869ff4e46755b85d851077771c220e2610496a29d98');
      (function() {
        return Address.fromPublicKey(pubkey, 'livenet', Address.PayToWitnessPublicKeyHash);
      }).should.throw('Witness addresses must use compressed public keys.');
    });

    it('should fail to make a wrapped address with an uncompressed pubkey', function() {
      var pubkey = new PublicKey('0485e9737a74c30a873f74df05124f2aa6f53042c2fc0a130d6cbd7d16b944b00' +
        '4833fef26c8be4c4823754869ff4e46755b85d851077771c220e2610496a29d98');
      (function() {
        return Address.fromPublicKey(pubkey, 'livenet', Address.PayToScriptHash);
      }).should.throw('Witness addresses must use compressed public keys.');
    });


    it('should classify from a custom network', function() {
      var custom = {
        name: 'customnetwork2',
        pubkeyhash: 0x1c,
        privatekey: 0x1e,
        scripthash: 0x28,
        bech32prefix: 'abc',
        xpubkey: 0x02e8de8f,
        xprivkey: 0x02e8da54,
        networkMagic: 0x0c110907,
        port: 7333
      };
      var addressString = 'abc1q9225pawdj2dlwsk3dd8phudsap6vjp7fzfr9m9';
      Networks.add(custom);
      var network = Networks.get('customnetwork2');
      var address = Address.fromString(addressString);
      address.type.should.equal(Address.PayToWitnessPublicKeyHash);
      address.network.should.equal(network);
      Networks.remove(network);
    });

    describe('from a script', function() {
      it('should make this address from a p2wpkh output script', function() {
        var s = new Script('OP_0 20 ' +
          '0x2a9540f5cd929bf742d16b4e1bf1b0e874c907c9');
        var buf = s.toBuffer();
        var a = Address.fromScript(s, 'livenet');
        a.toString().should.equal('web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z');
        var b = new Address(s, 'livenet');
        b.toString().should.equal('web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z');
      });

      it('should make this address from a p2wsh input script', function() {
        var s = Script.fromString('OP_0 32 0x2a9540f5cd9a9bf742d16b4e1bf1b0e874c907c9b825474c614569e0480f2619');
        var a = Address.fromScript(s, 'livenet');
        a.toString().should.equal('web1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0ycvsuee008');
        var b = new Address(s, 'livenet');
        b.toString().should.equal('web1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0ycvsuee008');
      });

      it('returns the same address if the script is a pay to witness public key hash out', function() {
        var address = 'web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z';
        var script = Script.buildWitnessV0Out(new Address(address));
        Address(script, Networks.livenet).toString().should.equal(address);
      });
      it('returns the same address if the script is a pay to witness script hash out', function() {
        var address = 'web1q9225pawdn2dlwsk3dd8phudsap6vjp7fhqj5wnrpg457qjq0ycvsuee008';
        var script = Script.buildWitnessV0Out(new Address(address));
        Address(script, Networks.livenet).toString().should.equal(address);
      });
    });

    it('should derive from this known address string livenet', function() {
      var address = new Address(str);
      var buffer = address.toBuffer();
      buffer.toString().should.equal(Buffer.from(str, 'utf8').toString());
    });

    it('should derive from this known address string testnet', function() {
      var a = new Address(P2WPKHTestnet[0], 'testnet');
      var b = new Address(a.toString());
      b.toString().should.equal(P2WPKHTestnet[0]);
      b.network.should.equal(Networks.testnet);
    });

    it('should derive from this known address string livenet witness scripthash', function() {
      var a = new Address(P2WSHLivenet[0], 'livenet', 'witnessscripthash');
      var b = new Address(a.toString());
      b.toString().should.equal(P2WSHLivenet[0]);
    });

    it('should derive from this known address string testnet witness scripthash', function() {
      var address = new Address(P2WSHTestnet[0], 'testnet', 'witnessscripthash');
      address = new Address(address.toString());
      address.toString().should.equal(P2WSHTestnet[0]);
    });

  });

  describe('#toBuffer', function() {

    it('2a9540f5cd929bf742d16b4e1bf1b0e874c907c9 corresponds to hash web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z', function() {
      var address = new Address(str);
      var fromBuffer = new Address(address.toBuffer())
      address.hashBuffer.toString('hex').should.equal(pubkeyhash.toString('hex'));
    });

  });

  describe('#object', function() {

    it('roundtrip to-from-to', function() {
      var obj = new Address(str).toObject();
      var address = Address.fromObject(obj);
      address.toString().should.equal(str);
    });
  });

  describe('#toString', function() {

    it('livenet witnesspubkeyhash address', function() {
      var address = new Address(str);
      address.toString().should.equal(str);
    });

    it('witnessscripthash address', function() {
      var address = new Address(P2WSHLivenet[0]);
      address.toString().should.equal(P2WSHLivenet[0]);
    });

    it('testnet witnessscripthash address', function() {
      var address = new Address(P2WSHTestnet[0]);
      address.toString().should.equal(P2WSHTestnet[0]);
    });

    it('testnet witnesspubkeyhash address', function() {
      var address = new Address(P2WPKHTestnet[0]);
      address.toString().should.equal(P2WPKHTestnet[0]);
    });

  });

  describe('#inspect', function() {
    it('should output formatted output correctly', function() {
      var address = new Address(str);
      var output = '<Address: web1q9225pawdj2dlwsk3dd8phudsap6vjp7fs4537z, type: witnesspubkeyhash, network: livenet>';
      address.inspect().should.equal(output);
    });
  });

  describe('questions about the address', function() {
    it('should detect a P2WSH address', function() {
      new Address(P2WSHLivenet[0]).isPayToWitnessScriptHash().should.equal(true);
      new Address(P2WSHLivenet[0]).isPayToWitnessPublicKeyHash().should.equal(false);
      new Address(P2WSHTestnet[0]).isPayToWitnessScriptHash().should.equal(true);
      new Address(P2WSHTestnet[0]).isPayToWitnessPublicKeyHash().should.equal(false);
    });
    it('should detect a Pay To Witness PubkeyHash address', function() {
      new Address(P2WPKHLivenet[0]).isPayToWitnessPublicKeyHash().should.equal(true);
      new Address(P2WPKHLivenet[0]).isPayToWitnessScriptHash().should.equal(false);
      new Address(P2WPKHTestnet[0]).isPayToWitnessPublicKeyHash().should.equal(true);
      new Address(P2WPKHTestnet[0]).isPayToWitnessScriptHash().should.equal(false);
    });
  });

  it('can roundtrip from/to a object', function() {
    var address = new Address(P2WSHLivenet[0]);
    expect(new Address(address.toObject()).toString()).to.equal(P2WSHLivenet[0]);
  });

  it('will use the default network for an object', function() {
    var obj = {
      hash: '2a9540f5cd9a9bf742d16b4e1bf1b0e874c907c9b825474c614569e0480f2619',
      type: 'witnessscripthash'
    };
    var address = new Address(obj);
    address.network.should.equal(Networks.defaultNetwork);
  });

  describe('creating a P2WSH address from public keys', function() {

    var public1 = '02da5798ed0c055e31339eb9b5cef0d3c0ccdec84a62e2e255eb5c006d4f3e7f5b';
    var public2 = '0272073bf0287c4469a2a011567361d42529cd1a72ab0d86aa104ecc89342ffeb0';
    var public3 = '02738a516a78355db138e8119e58934864ce222c553a5407cf92b9c1527e03c1a2';
    var publics = [public1, public2, public3];

    it('can create an address from a set of public keys', function() {
      var address = Address.createMultisig(publics, 2, Networks.livenet, null, Address.PayToWitnessScriptHash);
      address.toString().should.equal('web1qukwqyzxcjdykr0cfxghwkrx9rkmdvapc08syez75q5ewg3j5umvsdy7efh');
      address = new Address(publics, 2, Networks.livenet, Address.PayToWitnessScriptHash);
      address.toString().should.equal('web1qukwqyzxcjdykr0cfxghwkrx9rkmdvapc08syez75q5ewg3j5umvsdy7efh');
    });

    it('works on testnet also', function() {
      var address = Address.createMultisig(publics, 2, Networks.testnet, null, Address.PayToWitnessScriptHash);
      address.toString().should.equal('tb1qukwqyzxcjdykr0cfxghwkrx9rkmdvapc08syez75q5ewg3j5umvstuc27x');
    });

    it('can also be created by Address.createMultisig', function() {
      var address = Address.createMultisig(publics, 2, null, null, Address.PayToWitnessScriptHash);
      var address2 = Address.createMultisig(publics, 2, null, null, Address.PayToWitnessScriptHash);
      address.toString().should.equal(address2.toString());
    });

    it('fails if invalid array is provided', function() {
      expect(function() {
        return Address.createMultisig([], 3, 'testnet', null, Address.PayToWitnessScriptHash);
      }).to.throw('Number of required signatures must be less than or equal to the number of public keys');
    });
  });
});
