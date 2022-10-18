import web3 from "./web3";
import CompiledRegistry from "./build/Registry.json";
const config = require('./config.json');

let address;
const network = Object.keys(CompiledRegistry.networks)[0];
if (network != null) address = CompiledRegistry.networks[network].address;
if (address == null) address = config.registry_address;

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledRegistry.abi)),
  address
);

export default instance;
