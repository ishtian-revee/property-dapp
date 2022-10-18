import web3 from "./web3";
import CompiledToken from "./build/Token.json";
const config = require('./config.json');

let address;
const network = Object.keys(CompiledToken.networks)[0];
if (network != null) address = CompiledToken.networks[network].address;
if (address == null) address = config.token_address;

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledToken.abi)),
  address
);

export default instance;
