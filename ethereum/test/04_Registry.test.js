const Registry = artifacts.require("Registry");
const Property = artifacts.require("Property");
const Token = artifacts.require("Token");

let property;
let propertyOwner;

contract("Registry", (accounts) => {
  beforeEach(async () => {
    propertyInstance = await Property.deployed();
    tokenInstance = await Token.deployed();
    registryInstance = await Registry.deployed(propertyInstance.address, tokenInstance.address);
  });

  it("deploys registry contract", () => {
    assert.ok(registryInstance.contract);
  });

  it("allows adding new property", async () => {
    await registryInstance.addProperty(50, "Dhaka", 1200);
    property = await registryInstance.properties(0);
    assert.ok(property);
  });

  it("new property owner is the accounts at 0 index", async () => {
    const owner = await propertyInstance.ownerOf(0);
    assert.equal(owner, accounts[0]);
  });

  it("new property price is correct", async () => {
    assert.equal(property.price, "50");
  });

  it("new property location is correct", async () => {
    assert.equal(property.location, "Dhaka");
  });

  it("new property size is correct", async () => {
    assert.equal(property.size, "1200");
  });

  it("new property set as available", async () => {
    assert.equal(property.isAvailable, true);
  });

  it("new property listed successfully", async () => {
    assert.equal(property.location, "Dhaka");
  });

  it("200 AWT successfully transferred to account[1]", async () => {
    await tokenInstance.transferFrom(accounts[0], accounts[1], 200);
    const balance = await tokenInstance.balanceOf(accounts[1]);
    assert.equal(balance, "200");
  });

  it("owner of property contract allows approval for all", async () => {
    await propertyInstance.setApprovalForAll(registryInstance.address, true);
    assert.ok(propertyInstance.contract);
  });

  it("owner sets property as unavailable", async () => {
    await registryInstance.setPropertyAvailability(0, false);
    property = await registryInstance.properties(0);
    assert.equal(property.isAvailable, false);
  });

  it("owner sets property as available again", async () => {
    await registryInstance.setPropertyAvailability(0, true);
    property = await registryInstance.properties(0);
    assert.equal(property.isAvailable, true);
  });

  it("after buying the property is transferred to account at index 1", async () => {
    await registryInstance.buyProperty(0, {from: accounts[1]});
    propertyOwner = await propertyInstance.ownerOf(0);
    assert.equal(propertyOwner, accounts[1]);
  });

  it("buyer token balance deducted 50 AWT", async () => {
    const balance = await tokenInstance.balanceOf(accounts[1]);
    assert.equal(balance, "150");
  });

  it("previous owner token balance incremented by 50 AWT", async () => {
    const balance = await tokenInstance.balanceOf(accounts[0]);
    assert.equal(balance, "850");
  });

  it("property is not available now", async () => {
    const balance = await tokenInstance.balanceOf(accounts[0]);
    property = await registryInstance.properties(0);
    assert.equal(property.isAvailable, false);
  });

  it("purchase recorded: owner was account[0]", async () => {
    const purchase = await registryInstance.purchases(0);
    assert.equal(purchase.owner, accounts[0]);
  });

  it("purchase recorded: buyer is account[1]", async () => {
    const purchase = await registryInstance.purchases(0);
    assert.equal(purchase.buyer, accounts[1]);
  });

  it("purchase recorded: price is 50 AWT", async () => {
    const purchase = await registryInstance.purchases(0);
    assert.equal(purchase.price, "50");
  });
});
