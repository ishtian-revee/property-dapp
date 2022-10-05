const Property = artifacts.require("Property");

module.exports = function (deployer) {
  deployer.deploy(Property);
};
