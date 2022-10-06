import web3 from "./web3";
import CompiledToken from "./build/Token.json";

const instance = new web3.eth.Contract(
  JSON.parse(CompiledToken.abi),
  CompiledToken.address
);

export default instance;
