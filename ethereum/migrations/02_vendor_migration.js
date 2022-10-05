const Vendor = abstract.require("Vendor");
const Token = abstract.require("Token");

module.exports = function (deployer) {
  deployer.deploy(Vendor, Token.address);
};
