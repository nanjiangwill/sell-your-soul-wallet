// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

struct Action {
   address targetAddress;
   bytes encodedCall;
}

contract Wallet {
  address NFTMaster;

	function exec(Action[] calldata actions)
      public
      returns (bytes[] memory results)
  {
      results = new bytes[](actions.length);
      if (msg.sender == NFTMaster.ownerOf(uint256(this))) {
			for (uint256 i = 0; i < actions.length; i++) {
          results[i] = _Call(actions[i]);
      }
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
}

