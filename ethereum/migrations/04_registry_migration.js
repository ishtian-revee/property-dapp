const Registry = artifacts.require("Registry");
const Property = artifacts.require("Property");
const Token = artifacts.require("Token");

module.exports = function (deployer) {
  deployer.deploy(Registry, Property.address, Token.address);
};
