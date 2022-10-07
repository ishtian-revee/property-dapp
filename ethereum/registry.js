import web3 from "./web3";
import CompiledRegistry from "./build/Registry.json";

const network = Object.keys(CompiledRegistry.networks)[0];
const address = CompiledRegistry.networks[network].address;

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledRegistry.abi)),
  address
);

export default instance;
