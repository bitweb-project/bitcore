'use strict';

require('chai').should();
var bitcore = require('../..');
var Hash = bitcore.crypto.Hash;

describe('Hash', function() {
  var buf = Buffer.from([0, 1, 2, 3, 253, 254, 255]);
  var str = 'test string';

  describe('@sha1', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.sha1(buf);
      hash.toString('hex').should.equal('de69b8a4a5604d0486e6420db81e39eb464a17b2');
      hash = Hash.sha1(Buffer.alloc(0));
      hash.toString('hex').should.equal('da39a3ee5e6b4b0d3255bfef95601890afd80709');
    });

    it('throws an error when the input is not a buffer', function() {
      Hash.sha1.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#sha256', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.sha256(buf);
      hash.toString('hex').should.equal('6f2c7b22fd1626998287b3636089087961091de80311b9279c4033ec678a83e8');
    });

    it('fails when the input is not a buffer', function() {
      Hash.sha256.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#sha256hmac', function() {

    it('computes this known big key correctly', function() {
      var key = Buffer.from('b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad' +
        'b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad' +
        'b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad' +
        'b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad');
      var data = Buffer.alloc(0);
      Hash.sha256hmac(data, key).toString('hex')
        .should.equal('fb1f87218671f1c0c4593a88498e02b6dfe8afd814c1729e89a1f1f6600faa23');
    });

    it('computes this known empty test vector correctly', function() {
      var key =  Buffer.alloc(0);
      var data =  Buffer.alloc(0);
      Hash.sha256hmac(data, key).toString('hex')
        .should.equal('b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad');
    });

    it('computes this known non-empty test vector correctly', function() {
      var key = Buffer.from('key');
      var data =  Buffer.from('The quick brown fox jumps over the lazy dog');
      Hash.sha256hmac(data, key).toString('hex')
        .should.equal('f7bc83f430538424b13298e6aa6fb143ef4d59a14946175997479dbc2d1a3cd8');
    });

  });

  describe('#sha256sha256', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.sha256sha256(buf);
      hash.toString('hex').should.equal('be586c8b20dee549bdd66018c7a79e2b67bb88b7c7d428fa4c970976d2bec5ba');
    });

    it('fails when the input is not a buffer', function() {
      Hash.sha256sha256.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#sha256ripemd160', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.sha256ripemd160(buf);
      hash.toString('hex').should.equal('7322e2bd8535e476c092934e16a6169ca9b707ec');
    });

    it('fails when the input is not a buffer', function() {
      Hash.sha256ripemd160.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#ripemd160', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.ripemd160(buf);
      hash.toString('hex').should.equal('fa0f4565ff776fee0034c713cbf48b5ec06b7f5c');
    });

    it('fails when the input is not a buffer', function() {
      Hash.ripemd160.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#sha512', function() {

    it('calculates the hash of this buffer correctly', function() {
      var hash = Hash.sha512(buf);
      hash.toString('hex')
        .should.equal('c0530aa32048f4904ae162bc14b9eb535eab6c465e960130005fedd' +
          'b71613e7d62aea75f7d3333ba06e805fc8e45681454524e3f8050969fe5a5f7f2392e31d0');
    });

    it('fails when the input is not a buffer', function() {
      Hash.sha512.bind(Hash, str).should.throw('Invalid Argument');
    });

  });

  describe('#sha512hmac', function() {

    it('calculates this known empty test vector correctly', function() {
      var hex = 'b936cee86c9f87aa5d3c6f2e84cb5a4239a5fe50480a6ec66b70ab5b1f4a' +
        'c6730c6c515421b327ec1d69402e53dfb49ad7381eb067b338fd7b0cb22247225d47';
      Hash.sha512hmac(Buffer.alloc(0), Buffer.alloc(0)).toString('hex').should.equal(hex);
    });

    it('calculates this known non-empty test vector correctly', function() {
      var hex = 'c40bd7c15aa493b309c940e08a73ffbd28b2e4cb729eb94480d727e4df577' +
        'b13cc403a78e6150d83595f3b17c4cc331f12ca5952691de3735a63c1d4c69a2bac';
      var data = Buffer.from('test1');
      var key = Buffer.from('test2');
      Hash.sha512hmac(data, key).toString('hex').should.equal(hex);
    });

  });

  describe('#yespower/yescryptR16', function() {

    it('calculates yespower/yescryptR16 hash correctly', function() {
      var headers = [ "00000020f3f162be69a8f22b5a484ef8d75d43dab9a7837a76c366d29b4dc56b9c3e0400457a8ed16e45803a22b709314d0dee9dfe0bdebadfe2355798ac33c9cf9de8027ff18e60ffff1f1f5903000001020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff03510101ffffffff0200205a4ea6ea0000232103d4cef85b2c6d2f9eebc3b0c19d344148da54493b5205218127eb781e993ada56ac0000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf90120000000000000000000000000000000000000000000000000000000000000000000000000", "00000020f09d9c1fe2f4c98a6ba590002517cfbb034e3630390293ac81bc3e3a72060000a659f09acd3a2ec3687e9f92986fa480bd318aad55b3e6b90102d1f769d6a75710739160e7462e1e9203000002010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff2102d0070410739160085ffffffa000000000f2f2f6e6f64655374726174756d2f2f00000000030000000000000000266a24aa21a9ed28ffd246a37b0ffd03c9edf9fefc7af627786c17c3e472a8f3cecc1e3bdd46e7b899fe29010000001976a914a9b080928772761ea6cce17cd6181a142a56ca1488ac21a10700000000001976a914a9b080928772761ea6cce17cd6181a142a56ca1488ac012000000000000000000000000000000000000000000000000000000000000000000000000002000000051d4d479d492d97b430bbc24435838246c5b0c3baee01815f82129498f13847f4010000006a473044022079fe0f87e0889a8621c844e451595812237c18122b3e8c423725225c4fd2f8a0022031bc5252bc4806c228b1928d303b6b04449b24765dc11caa82fbf42d7b551beb0121022cbe36fd712ac733e370eb72ff3120d362313b217157139d9d67e63c1c0461acfeffffff3c88881df7384650a98c75d190f19d54ade6d0e06ebc62598b30a0207eb7cb0e020000006b483045022100dfcb0523900de3e427c3908fa86fa3922c733c77cb79ac8281f0a6be46bff66c02203856fcfd988792ff7dc7d59b15c6240e4ad81ead1ca5d3e2f81f9b6af2d2c3700121022cbe36fd712ac733e370eb72ff3120d362313b217157139d9d67e63c1c0461acfeffffffa6a6631ec63d970862b1e45be539594e042c36062be6d384f9d53ec465d2c4ad010000006b4830450221008448db982c6eaed5b18120644b51af0c6a5f50cdf0bc236ace65fb7e31f0d908022021efa948ae2868b5535b207da369b19a5033c54a397d7e28696f0a2a8089edb30121022cbe36fd712ac733e370eb72ff3120d362313b217157139d9d67e63c1c0461acfeffffffab605496fc78b18b5ef547254f0028af27ff554e6bbcf8c3533cdec6de13a602020000006a473044022059f66293c18eb9952f44c63bd8adc6b4161c4e9b306e9cdeb169454a62d33b8b02204a72ba30a081db23c3648acd02e15595fa04d1639c79e599aa5fe194b7345bc50121022cbe36fd712ac733e370eb72ff3120d362313b217157139d9d67e63c1c0461acfeffffffe9949754d0829f83fffec9ab0a9cb8ba301fd5286e7bbf8758972b984397c7d7010000006b483045022100e21374eda7d6b911dce80dea6a8dba1c3c0f69c896e8f230e398e70f447af981022017f8ed717914a5e21e833912ea678551542ebf3b0f9b5de7a660c4ca33fcfee80121022cbe36fd712ac733e370eb72ff3120d362313b217157139d9d67e63c1c0461acfeffffff05625e9a38010000001976a914105e1d93651119328600fb44110c6ad59acb875088acd6fe0057010000001976a914836a6670a67ca9b87a9ff3a1ba1bcbbc22d0dcad88accea9acbd000000001976a9146e45a916b3661e80ef4a8274c95b3e1cc7e1e7f088ac976e0f00000000001976a9140000e8f3bf4b6471b95575c0b26529a4a74298e588ac129cb230000000001976a91484d239b93f58bb9d253ea80843a8ef3b68cacadb88acce070000", "0000002041336bf53745400ba913bc754f9c49a25ccb226eb9dac03870e31d6d2e0000007a6bd444350153737012e6bd096fd78c4f045180d4dbc9748503d866b1f37f9bfd85eb602571381d0081555501010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff4e03a0860104fd85eb6008fabe6d6d000000000000000000000000000000000000000000000000000000000000000001000000000000005fff088d000000000f706f6f6c2e72706c616e742e78797a00000000020000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf900f2052a010000001976a914719b3d3cb30856314fd605c3920e2556a12c6e2a88ac0120000000000000000000000000000000000000000000000000000000000000000000000000", "00000020bfdfd91aeebac7a94a413c6226f8ecf35daede29835cf2dbf80f2b9f20000000013d2f35180f9930063901f3910f8dbec4bbbe89b44e57b4d0fa9de0346a07e17e260d64e0e9771d2a10008001010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff4e0310cd0e047e260d6408fabe6d6d00000000000000000000000000000000000000000000000000000000000000000100000000000000a0911a6d000000000f706f6f6c2e72706c616e742e78797a00000000020000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf900f90295000000001976a9142d8c740dfee1fbfb4830e54e7875a772d872cfbe88ac0120000000000000000000000000000000000000000000000000000000000000000000000000", "000000201fb25e786260de66bf6a93f2d00120c7bd566cd77503fd10b23ac2a10f00000058bef0bb500532cf54a49b7ce76773aa9abda1aade3f0ff44b2df54ed86bb6eedb701664ebfe5c1d2908000001010000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff4e0393f40e04db70166408fabe6d6d0000000000000000000000000000000000000000000000000000000000000000010000000000000014f7618a000000000f706f6f6c2e72706c616e742e78797a00000000020000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf900f90295000000001976a9142d8c740dfee1fbfb4830e54e7875a772d872cfbe88ac0120000000000000000000000000000000000000000000000000000000000000000000000000" ];
      var hashes = [ "906aff7a69cafa33e088c90e71bf57d41d55f1ca33e9fe369b2dd9bc8c491d00", "f52c66e5146ee13bb066d94e344e86279169879acec803e4b3027a99bf020000", "ffe81406b8da59d9299ddf4894c959bf6e7b1fa744cdc5c0ea487b382d000000", "1978cf495b6046611bce275bbfb9ea97c3ea7d3f3246a2cc40ae3af551000000", "d86119d42777d2d6d295f9abb61c8b4cbd3b1b8c8ec0cf42138871f02d000000" ];

      headers.forEach(function(header, i) {
        var data = Buffer.from(header, 'hex');
        Hash.yespower(data).toString('hex').should.equal(hashes[i]);
      });
    });
  });
});
