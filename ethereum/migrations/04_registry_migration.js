const path = require("path");
const fs = require("fs-extra");
const Registry = artifacts.require("Registry");
const Property = artifacts.require("Property");
const Vendor = artifacts.require("Vendor");
const Token = artifacts.require("Token");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);
fs.outputJsonSync(
  path.resolve(buildPath, "Token.json"),
  JSON.parse(JSON.stringify(Token))
);
fs.outputJsonSync(
  path.resolve(buildPath, "Vendor.json"),
  JSON.parse(JSON.stringify(Vendor))
);
fs.outputJsonSync(
  path.resolve(buildPath, "Property.json"),
  JSON.parse(JSON.stringify(Property))
);
fs.outputJsonSync(
  path.resolve(buildPath, "Registry.json"),
  JSON.parse(JSON.stringify(Registry))
);

module.exports = function (deployer) {
  deployer.deploy(Registry, Property.address, Token.address);
};
