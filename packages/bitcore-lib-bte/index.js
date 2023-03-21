'use strict';

var bitwebcore = module.exports;

// module information
bitwebcore.version = 'v' + require('./package.json').version;
bitwebcore.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of bitwebcore-lib found. ' +
      'Please make sure to require bitwebcore-lib and check that submodules do' +
      ' not also include their own bitwebcore-lib dependency.';
    throw new Error(message);
  }
};
bitwebcore.versionGuard(global._bitwebcore);
global._bitwebcore = bitwebcore.version;

// crypto
bitwebcore.crypto = {};
bitwebcore.crypto.BN = require('./lib/crypto/bn');
bitwebcore.crypto.ECDSA = require('./lib/crypto/ecdsa');
bitwebcore.crypto.Hash = require('./lib/crypto/hash');
bitwebcore.crypto.Random = require('./lib/crypto/random');
bitwebcore.crypto.Point = require('./lib/crypto/point');
bitwebcore.crypto.Signature = require('./lib/crypto/signature');

// encoding
bitwebcore.encoding = {};
bitwebcore.encoding.Base58 = require('./lib/encoding/base58');
bitwebcore.encoding.Base58Check = require('./lib/encoding/base58check');
bitwebcore.encoding.BufferReader = require('./lib/encoding/bufferreader');
bitwebcore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
bitwebcore.encoding.Varint = require('./lib/encoding/varint');

// utilities
bitwebcore.util = {};
bitwebcore.util.buffer = require('./lib/util/buffer');
bitwebcore.util.js = require('./lib/util/js');
bitwebcore.util.preconditions = require('./lib/util/preconditions');

// errors thrown by the library
bitwebcore.errors = require('./lib/errors');

// main bitcoin library
bitwebcore.Address = require('./lib/address');
bitwebcore.Block = require('./lib/block');
bitwebcore.MerkleBlock = require('./lib/block/merkleblock');
bitwebcore.BlockHeader = require('./lib/block/blockheader');
bitwebcore.HDPrivateKey = require('./lib/hdprivatekey.js');
bitwebcore.HDPublicKey = require('./lib/hdpublickey.js');
bitwebcore.Message = require('./lib/message');
bitwebcore.Networks = require('./lib/networks');
bitwebcore.Opcode = require('./lib/opcode');
bitwebcore.PrivateKey = require('./lib/privatekey');
bitwebcore.PublicKey = require('./lib/publickey');
bitwebcore.Script = require('./lib/script');
bitwebcore.Transaction = require('./lib/transaction');
bitwebcore.URI = require('./lib/uri');
bitwebcore.Unit = require('./lib/unit');

// dependencies, subject to change
bitwebcore.deps = {};
bitwebcore.deps.bnjs = require('bn.js');
bitwebcore.deps.bs58 = require('bs58');
bitwebcore.deps.Buffer = Buffer;
bitwebcore.deps.elliptic = require('elliptic');
bitwebcore.deps.scryptsy = require('scryptsy');
bitwebcore.deps._ = require('lodash');
bitwebcore.deps.bitwebyespower = require('bitwebyespower');

// Internal usage, exposed for testing/advanced tweaking
bitwebcore.Transaction.sighash = require('./lib/transaction/sighash');
