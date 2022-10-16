// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./OwnershipNFT.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC721/IERC721Receiver.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC1155/IERC1155Receiver.sol";
import "../lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol";

struct Action {
   address targetAddress;
   bytes encodedCall;
}

contract Wallet is IERC721Receiver, IERC1155Receiver{
  address immutable ownershipNFT;

  bytes4 public constant INTERFACE_ID_ERC165 = 0x01ffc9a7;
  bytes4 public constant INTERFACE_ID_ERC721RECEIVER = 0x150b7a02;
  bytes4 public constant INTERFACE_ID_ERC1155RECEIVER = 0x4e2312e0;

  mapping(bytes4 => bool) internal _supportedInterfaces;

  constructor (address _ownershipNFT) {
    ownershipNFT = _ownershipNFT;
    _registerInterface(INTERFACE_ID_ERC165);
    _registerInterface(INTERFACE_ID_ERC721RECEIVER);
    _registerInterface(INTERFACE_ID_ERC1155RECEIVER);
  }

  function exec(Action[] calldata actions)
    public
    returns (bytes[] memory results)
  {
    results = new bytes[](actions.length);
    require(msg.sender == OwnershipNFT(ownershipNFT).ownerOf(uint256(uint160(address(this)))), "You are not the owner.");
	  for (uint256 i = 0; i < actions.length; i++) { 
      results[i] = _call(actions[i]);
    }
  }

  function _call(Action calldata action)
    internal
    returns (bytes memory)
  {
    (bool success, bytes memory result) = action.targetAddress.call(
      action.encodedCall
      );

    require(success, "Call failed");
    return result;
  }
  

  function transferEthOut(address to, uint256 amount) 
      public
      returns (bool success)
  {
      require(msg.sender == OwnershipNFT(ownershipNFT).ownerOf(uint256(uint160(address(this)))), "You are not the owner.");
      (success, ) = to.call{value: amount}("");
  }

  receive() external payable {}

  function onERC721Received(
    address, 
    address, 
    uint256, 
    bytes memory) 
  external pure returns (bytes4) {
    return IERC721Receiver.onERC721Received.selector;
  }

  function onERC1155Received(address, address, uint256, uint256, bytes memory) external pure returns (bytes4) {
    return IERC1155Receiver.onERC1155Received.selector;
  }

  function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) external pure returns (bytes4) {
    return IERC1155Receiver.onERC1155BatchReceived.selector;
  }

  function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
    return _supportedInterfaces[interfaceId];
  }

  function _registerInterface(bytes4 interfaceId) internal {
    require(interfaceId != 0xffffffff, "ERC165InterfacesSupported: invalid interface id");
    _supportedInterfaces[interfaceId] = true;
  }
  

}

