import web3 from "./web3";
import CompiledProperty from "./build/Property.json";
const config = require('./config.json');

let address;
const network = Object.keys(CompiledProperty.networks)[0];
if (network != null) address = CompiledProperty.networks[network].address;
if (address == null) address = config.property_address;

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledProperty.abi)),
  address
);

export default instance;
