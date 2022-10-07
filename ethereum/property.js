import web3 from "./web3";
import CompiledProperty from "./build/Property.json";

const network = Object.keys(CompiledProperty.networks)[0];
const address = CompiledProperty.networks[network].address;

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledProperty.abi)),
  address
);

export default instance;
