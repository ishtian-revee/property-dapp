import web3 from "./web3";
import CompiledRegistry from "./build/Registry.json";

const instance = new web3.eth.Contract(
  JSON.parse(CompiledRegistry.abi),
  CompiledRegistry.address
);

export default instance;
