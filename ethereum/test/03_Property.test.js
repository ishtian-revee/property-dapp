const Property = artifacts.require("Property");

contract("Property", (accounts) => {
  beforeEach(async () => {
    instance = await Property.deployed();
  });

  it("deploys property contract", () => {
    assert.ok(instance.contract);
  });

  it("nft name is Property", async () => {
    const name = await instance.name();
    assert.equal(name, "Property");
  });

  it("nft symbol is PPT", async () => {
    const symbol = await instance.symbol();
    assert.equal(symbol, "PPT");
  });

  it("minted by accounts[0] is the owner of 0th nft", async () => {
    await instance.mint(accounts[0], 0);
    const owner = await instance.ownerOf(0);
    assert.equal(owner, accounts[0]);
  });
});
