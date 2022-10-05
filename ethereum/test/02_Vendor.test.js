const Vendor = artifacts.require("Vendor");
const Token = artifacts.require("Token");

contract("Vendor", (accounts) => {
  beforeEach(async () => {
    tokenInstance = await Token.deployed();
    vendorInstance = await Vendor.deployed(tokenInstance.address);
    minter = await tokenInstance._minter();
  });

  it("deploys vendor contract", () => {
    assert.ok(instance.contract);
  });

  it("minter has currently all the supplies", async () => {
    const minterBalance = await tokenInstance.balanceOf(minter);
    const totalSupply = await tokenInstance.totalSupply();
    assert.equal(minterBalance, totalSupply.toString());
  });

  it("all supplies transferred to vendor account", async () => {
    const totalSupply = await tokenInstance.totalSupply();
    await tokenInstance.transferFrom(
      minter,
      vendorInstance.address,
      totalSupply
    );
    const vendorBalance = await tokenInstance.balanceOf(vendorInstance.address);
    assert.equal(vendorBalance, totalSupply.toString());
  });

  it("minter has now 0 supplies", async () => {
    const minterBalance = await tokenInstance.balanceOf(minter);
    assert.equal(minterBalance, "0");
  });

  it("allows minter to buy 200 tokens", async () => {
    // 1 ETH = 100 AWT
    const vendorBalance = await tokenInstance.balanceOf(vendorInstance.address);
    await vendorInstance.buyToken({
      from: minter,
      value: 2,
    });
    const minterBalance = await tokenInstance.balanceOf(minter);
    assert.equal(minterBalance, "200");
  });

  it("vendor has now 200 token less", async () => {
    const vendorBalance = await tokenInstance.balanceOf(vendorInstance.address);
    const totalSupply = await tokenInstance.totalSupply();
    assert.equal(vendorBalance, (totalSupply - 200).toString());
  });

  it("vendor has 2 ETH in the balance", async () => {
    const balance = await web3.eth.getBalance(vendorInstance.address);
    assert.equal(balance, "2");
  });

  it("allows minter to sell 100 tokens to vendor", async () => {
    let prevBalance = await tokenInstance.balanceOf(vendorInstance.address);
    await vendorInstance.sellToken(100);
    const currBalance = await tokenInstance.balanceOf(vendorInstance.address);
    assert.equal(currBalance, (parseInt(prevBalance) + 100).toString());
  });

  it("minter has now 100 tokens", async () => {
    const minterBalance = await tokenInstance.balanceOf(minter);
    assert.equal(minterBalance, 100);
  });

  it("vendor has 1 ETH", async () => {
    const balance = await web3.eth.getBalance(vendorInstance.address);
    assert.equal(balance, 1);
  });

  it("after withdraw vendor account has 0 balance", async () => {
    await vendorInstance.withdraw();
    const balance = await web3.eth.getBalance(vendorInstance.address);
    assert.equal(balance, 0);
  });
});
