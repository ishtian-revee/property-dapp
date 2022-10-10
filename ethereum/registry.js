import web3 from "./web3";
import CompiledRegistry from "./build/Registry.json";

let address;
const network = Object.keys(CompiledRegistry.networks)[0];
if (network != null) address = CompiledRegistry.networks[network].address;
if (address == null) address = "0x821cce3bD2F4707C2bE8f7bf9E3545A50d6b1202";

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledRegistry.abi)),
  address
);

export default instance;
