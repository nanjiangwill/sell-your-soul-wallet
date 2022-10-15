// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "./Wallet.sol";

address constant TokenFOO = 0x16367BB04F0Bb6D4fc89d2aa31c32E0ddA609508;
address constant TokenBAR = 0x26AA6EF8FCf205E7aC9466DBa73bcC8a8FA9B958;

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
        string memory addressText = Strings.toHexString(tokenId, 20);
        address addr = address(uint160(tokenId));
        return string(abi.encodePacked(
        '<svg width="450" height="130" xmlns="http://www.w3.org/2000/svg"><g id="Layer_1">',
        '<title>Layer 1</title>',
        '<text xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="24" id="svg_1" y="48" x="30" stroke-width="0" stroke="#000" fill="#000000">Sell-your-soul Wallet</text>',
        '<a xlink:href="https://goerli.arbiscan.io/address/',
        addressText,
        '">',
        '<text stroke="#000" xml:space="preserve" text-anchor="start" font-family="Noto Sans JP" font-size="18" id="svg_4" y="99" x="32" stroke-width="0" fill="#000000">',
        addressText,
        '</text></a>',
        'ETH: ', addr.balance,
        'FOO: ', IERC20(TokenFOO).balanceOf(addr),
        'BAR: ', IERC20(TokenBAR).balanceOf(addr),
        '</g></svg>'
        ));
    }
}
