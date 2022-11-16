![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![Web3.js](https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Semantic UI React](https://img.shields.io/badge/Semantic%20UI%20React-%2335BDB2.svg?style=for-the-badge&logo=SemanticUIReact&logoColor=white)

# About The Project ⭐

This repository contains all the source code of a property decentralized application built on `Ethereum Blockchain (Goerli Test Network).` 

This is a property marketplace where user can mint their property information as an `NFT` and can trade these NFTs to others. So, basically, anyone can buy properties in a form of NFTs. Also, the users need to trade their property NFTs with `a custom ERC20 standard token called AWT (Awesome Token)` instead of native Ethereum currency (ETH).

# Built With 🛠

Following technologies, frameworks and libraries are used to build this project:

- [Solidity](https://docs.soliditylang.org/en/v0.8.17/) for smart contract development
- [Openzepplin Contracts](https://docs.openzeppelin.com/contracts/4.x/) for EC20 and ERC721 (NFT) tokens
- [Truffle Suit](https://trufflesuite.com/truffle/) (test and development framework)
- [web3.js](https://web3js.readthedocs.io/en/v1.8.1/)
- [React](https://reactjs.org/docs/getting-started.html)
- [Next.js](https://nextjs.org/docs)
- [Semantic UI React](https://react.semantic-ui.com/)

# Features 🎯

Property DApp provides the following features:

- Add/Mint new property
- Buy properties
- Set property availability status
- Set approval status
- Property purchases records
- Get details of AWT and vendor contract
- Purchase and Sell AWT
- Mint and Burn AWTs
- Withdraw vendor balance
- AWT transfer records

# Getting Started 🚀

To interact with this decentralized application you must need a `Metamask` wallet, must have some test ETH, and an `Infura API Key` for the `Goerli` test network. If you have all of these then you can jump to the `Project Setup` section skipping the following steps.

### 🔸 Step 1: Metamask Wallet Setup

Get `Metamask` wallet extension to your browser and set up your Metamask wallet account. When you set up a Metamask wallet, you will be asked to note down and then re-enter 12 words. These words are your `Mnemonic` seed phrase. Keep it somewhere safe.

### 🔸 Step 2: Get Test Ethers for Goerli Test Network

Make sure in your Metamask wallet `Goerli Testnet` is selected instead of `Ethereum Mainnet.` Now you need some test `Ethers` in your wallet. To get free test ETH you can go to any of the following `Goerli Faucet` links:

- https://faucets.chain.link/
- https://goerlifaucet.com/

Provide your Metamask account address and get free test ETH.

### 🔸 Step 3: Get Your Infura API Key

To communicate with the Ethereum blockchain you need [Infura](https://www.infura.io/) API Key. Go to the Infura website, register, and create a new API key for Web3 API. 

# Project Setup 🏹

### 🔸 System Requirements

Before you begin, make sure you have the following installed:

- [Node.js v16 or above](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git/)

### 🔸 Clone Project and Package Initialization

1. Clone the project by running the following git command in your git-CLI:

```
git clone https://github.com/ishtian-revee/property-dapp.git
```

2. Execute the following command in the project root folder:

```jsx
npm install --legacy-peer-deps
```

### 🔸 Config File Setup

Go to the `ethereum` directory and create a config file named `config.json`. Then add the following lines to this file: 

```json
{
    "mnemonic" : "{YOUR_METAMASK_MNEMONIC_PHRASE}",
    "infura_api_key" : "{YOUR_GOERLI_INFURA_API_KEY}",
    "token_address" : "0x8F4cA6f968Ed3276f871C5AF6237FF4e143538d7",
    "vendor_address": "0x6074B60E0a6659aF74012278Cd55971B5aAE082d",
    "property_address": "0x9FBB7A582B7Cb5f5Ec952B4564d54dDB9Cc22a7c",
    "registry_address": "0x5f6d3e3590b0CCbc7CEf36fC519d334261df6B74"
}
```

Insert your Metamask Mnemonic Phrase and Goerli Infura API Key to the `"mnemonic"` and `"infura_api_key"` parameters accordingly.

### 🔸 Run The Project

1. Now go back to the root directory and run the following command:

```jsx
npm run dev
```

2. After that visit http://locahost:3000/

3. Metamask should be prompted. Connect to your wallet and you are all set! 🎉


