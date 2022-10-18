import web3 from "./web3";
import CompiledVendor from "./build/Vendor.json";
const config = require('./config.json');

let address;
const network = Object.keys(CompiledVendor.networks)[0];
if (network != null) address = CompiledVendor.networks[network].address;
if (address == null) address = config.vendor_address;

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledVendor.abi)),
  address
);

export default instance;
