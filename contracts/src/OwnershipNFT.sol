// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "./Wallet.sol";

contract OwnershipNFT is ERC721 {

    event Mint(address owner, address wallet, uint256 tokenId);

    constructor(
        string memory name_,
        string memory symbol_)
        ERC721(name_, symbol_) {}

    function mint() external returns (uint256) {
        address wallet = address(new Wallet(address(this)));
        uint256 tokenId = uint256(uint160(wallet));
        _mint(msg.sender, tokenId);
        emit Mint(msg.sender, wallet, tokenId);
        return tokenId;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://goerli.arbiscan.io/address/";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        string memory baseURI = _baseURI();
        return string(abi.encodePacked(baseURI, Strings.toHexString(tokenId, 20)));
    }
}
