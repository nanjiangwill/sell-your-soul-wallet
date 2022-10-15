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

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        return string(abi.encodePacked(
        '<svg width="450" height="130" xmlns="http://www.w3.org/2000/svg"><g id="Layer_1"> <title>Layer 1</title><text xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="24" id="svg_1" y="48" x="30" stroke-width="0" stroke="#000" fill="#000000">Sell-your-soul Wallet</text><text stroke="#000" xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="18" id="svg_4" y="99" x="32" stroke-width="0" fill="#000000">',
        Strings.toHexString(tokenId, 20),
        '</text></g> </svg>'
        ));
    }
}
