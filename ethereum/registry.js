import web3 from "./web3";
import CompiledRegistry from "./build/Registry.json";

// for some reason the network object is empty here. That is why cannot get the address from compiled registry file
// const network = Object.keys(CompiledRegistry.networks)[0];
// const address = CompiledRegistry.networks[network].address;
const address = "0x821cce3bD2F4707C2bE8f7bf9E3545A50d6b1202";

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledRegistry.abi)),
  address
);

export default instance;
