import web3 from "./web3";
import CompiledVendor from "./build/Vendor.json";

const network = Object.keys(CompiledVendor.networks)[0];
const address = CompiledVendor.networks[network].address;

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledVendor.abi)),
  address
);

export default instance;
