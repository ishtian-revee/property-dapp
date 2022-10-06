import web3 from "./web3";
import CompiledVendor from "./build/Vendor.json";

const instance = new web3.eth.Contract(
  JSON.parse(CompiledVendor.abi),
  CompiledVendor.address
);

export default instance;
