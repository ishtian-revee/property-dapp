const Vendor = artifacts.require("Vendor");
const Token = artifacts.require("Token");

module.exports = function (deployer) {
  deployer.deploy(Vendor, Token.address);
};
