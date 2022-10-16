// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./Wallet.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Strings.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Base64.sol";


address constant TokenFOO = 0x16367BB04F0Bb6D4fc89d2aa31c32E0ddA609508;
address constant TokenBAR = 0x26AA6EF8FCf205E7aC9466DBa73bcC8a8FA9B958;

contract OwnershipNFT is ERC721Enumerable {

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
        string[9] memory parts;

        parts[0] = '<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="background-color:Orange">   <style>.title { fill: black; font-family: sans-serif; font-size: 27px; }</style>    <style>.title2 { fill: black; font-family: sans-serif; font-size: 14px; }</style>    <style>.mainText { fill: black; font-family: sans-serif; font-size: 14px; }</style><style>.smolText { fill: black; font-family: sans-serif; font-size: 10px; }</style><text x="31" y="50" class="title">Sell-your-soul Wallet</text><text x="15" y="75" class="title2">A tradable and rentable smart contract wallet</text><text x="15" y="120" class="mainText">ETH Balance: ';

        parts[1] = Strings.toString(addr.balance);
        parts[2] = '</text><text x="15" y="150" class="mainText">FOO Balance: ';
        parts[3] = Strings.toString(IERC20(address(TokenFOO)).balanceOf(addr));
        parts[4] = '</text><text x="15" y="180" class="mainText">BAR Balance: ';
        parts[5] = Strings.toString(IERC20(address(TokenFOO)).balanceOf(addr));
        parts[6] = '</text><text x="15" y="230" class="mainText">Wallet Address:</text><text x="15" y="245" class="smolText">';
        parts[7] = addressText;
        parts[8] = '</text><defs><clipPath id="clip0_1_18"><rect width="300" height="300" fill="white"/></clipPath></defs></svg>';

        string memory svg = string(abi.encodePacked('data:image/svg+xml;utf8,', parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7], parts[8]));

        return svg;
    }
}
