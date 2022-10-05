const Registry = artifacts.require("Registry");
const Property = artifacts.require("Property");
const Token = artifacts.require("Token");

contract("Token", (accounts) => {
  beforeEach(async () => {
    registryInstance = await Registry.deployed();
    propertyInstance = await Property.deployed();
    tokenInstance = await Token.deployed();
  });

  it("deploys registry contract", () => {
    assert.ok(registryInstance.contract);
  });

  it("allows adding new property", async () => {
    await registryInstance.addProperty(50, "Dhaka", 1200);
    const property = await registryInstance.properties(0);
    assert.ok(property);
  });

  it("new property owner is the accounts at 0 index", async () => {
    const owner = await propertyInstance.ownerOf(0);
    assert.equal(owner, accounts[0]);
  });

  it("new property price is correct", async () => {
    const property = await registryInstance.properties(0);
    assert.equal(property.price, "50");
  });

  it("new property location is correct", async () => {
    const property = await registryInstance.properties(0);
    assert.equal(property.location, "Dhaka");
  });

  it("new property size is correct", async () => {
    const property = await registryInstance.properties(0);
    assert.equal(property.size, "1200");
  });

  it("new property listed successfully", async () => {
    const property = await registryInstance.propertyList(0);
    assert.equal(property.location, "Dhaka");
  });

  it("deploys token contract", () => {
    assert.ok(tokenInstance.contract);
  });

  it("200 AWT successfully transferred to account[1]", async () => {
    await tokenInstance.transferFrom(accounts[0], accounts[1], 200);
    const balance = await tokenInstance.balanceOf(accounts[1]);
    assert.equal(balance, "200");
  });
});
