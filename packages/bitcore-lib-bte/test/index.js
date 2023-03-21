"use strict";

var should = require("chai").should();
var bitwebcore = require("../");

describe('#versionGuard', function() {
  it('global._bitwebcore should be defined', function() {
    should.equal(global._bitwebcore, bitwebcore.version);
  });

  it('throw an error if version is already defined', function() {
    (function() {
      bitwebcore.versionGuard('version');
    }).should.throw('More than one instance of bitwebcore');
  });
});
