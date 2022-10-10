import web3 from "./web3";
import CompiledProperty from "./build/Property.json";

let address;
const network = Object.keys(CompiledProperty.networks)[0];
if (network != null) address = CompiledProperty.networks[network].address;
if (address == null) address = "0x3A5e1d0dBF43948dE71A0a8e3a9013a86afA01a2";

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledProperty.abi)),
  address
);

export default instance;
