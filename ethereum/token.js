import web3 from "./web3";
import CompiledToken from "./build/Token.json";

let address;
const network = Object.keys(CompiledToken.networks)[0];
if (network != null) address = CompiledToken.networks[network].address;
if (address == null) address = "0x3d3Cd5940AFc761E10535c61B054d9034631b5be";

const instance = new web3.eth.Contract(
  JSON.parse(JSON.stringify(CompiledToken.abi)),
  address
);

export default instance;
