import web3 from "./web3";
import CompiledVendor from "./build/Vendor.json";

let address;
const network = Object.keys(CompiledVendor.networks)[0];
if (network != null) address = CompiledVendor.networks[network].address;
if (address == null) address = "0x989b2368977cE104aebd168ae605aEFD41Cd8C67";

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledVendor.abi)),
  address
);

export default instance;
