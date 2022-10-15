const Token = artifacts.require("Token");

contract("Token", (accounts) => {
  beforeEach(async () => {
    instance = await Token.deployed();
    owner = await instance.owner();
    minter = await instance.minter();
  });

  it("deploys token contract", () => {
    assert.ok(instance.contract);
  });

  it("owner is the first account or account at index 0", () => {
    assert.equal(owner, accounts[0]);
  });

  it("token name is Awesome Token", async () => {
    const name = await instance.name();
    assert.equal(name, "Awesome Token");
  });

  it("token symbol is AWT", async () => {
    const symbol = await instance.symbol();
    assert.equal(symbol, "AWT");
  });

  it("total supply is 1000", async () => {
    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply, "1000");
  });

  it("minter is the owner", () => {
    assert.equal(minter, owner);
  });

  it("minter has all the supply", async () => {
    const minterBalance = await instance.balanceOf(minter);
    const totalSupply = await instance.totalSupply();
    assert.equal(minterBalance, totalSupply.toString());
  });

  it("after minting 100 AWT, total supply is now 1100", async () => {
    await instance.mint(100);
    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply.toString(), "1100");
  });

  it("after burning 200 AWT, total supply is now 900", async () => {
    await instance.confiscate(minter, 200);
    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply.toString(), "900");
  });

  it("100 AWT successfully transferred to account[1]", async () => {
    await instance.transferFrom(minter, accounts[1], 100);
    const accountOneBalance = await instance.balanceOf(accounts[1]);
    assert.equal(accountOneBalance, "100");
  });

  it("100 AWT successfully deducted from minter account", async () => {
    const minterBalance = await instance.balanceOf(minter);
    assert.equal(minterBalance, "800");
  });
});
