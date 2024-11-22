// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract StevenUniverse is ERC1155{


    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/QmPHyvqT3ggXJaCXaM8CbEaC72s6x2MMHKJrK2BsitBMRz/{id}.json") {}

    // Mint function for the owner to create new tokens
    function ownerMint(address to, uint256 id, uint256 amount) external payable  {
        _mint(to, id, amount,"");
    }

}
