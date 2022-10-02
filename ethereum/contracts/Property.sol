// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Property is ERC721 {

    constructor() ERC721("Property", "PPT") {}

    function mint(address _to, uint256 _tokenId) public {
        _safeMint(_to, _tokenId);
    }
}
