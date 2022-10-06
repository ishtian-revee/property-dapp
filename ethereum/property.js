import web3 from "./web3";
import CompiledProperty from "./build/Property.json";

const instance = new web3.eth.Contract(
  JSON.parse(CompiledProperty.abi),
  CompiledProperty.address
);

export default instance;
