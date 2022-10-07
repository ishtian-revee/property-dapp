import web3 from "./web3";
import CompiledToken from "./build/Token.json";

const network = Object.keys(CompiledToken.networks)[0];
const address = CompiledToken.networks[network].address;

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledToken.abi)),
  address
);

export default instance;
