pragma solidity ^0.8.17;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "./Wallet.sol";

contract OwnershipNFT is ERC721 {

    constructor(
        string memory name_, 
        string memory symbol_) 
        ERC721(name_, symbol_) {}

    function mint() external returns (uint256) {
        address wallet = address(new Wallet());
        uint256 tokenId = uint256(uint160(wallet));
        _mint(msg.sender, tokenId);
        return tokenId;
    }
}