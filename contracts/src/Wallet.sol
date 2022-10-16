// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./OwnershipNFT.sol";

struct Action {
   address targetAddress;
   bytes encodedCall;
}

contract Wallet {
  address ownershipNFT;

  constructor (address _ownershipNFT) {
    ownershipNFT = _ownershipNFT;
  }

	function exec(Action[] calldata actions)
      public
      returns (bytes[] memory results)
  {
      results = new bytes[](actions.length);
      require(msg.sender == OwnershipNFT(ownershipNFT).ownerOf(uint256(uint160(address(this)))), "You are not the owner.");
			for (uint256 i = 0; i < actions.length; i++) {
          results[i] = _Call(actions[i]);
      }
	}

	function _Call(Action calldata action)
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
}

