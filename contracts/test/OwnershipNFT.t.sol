pragma solidity ^0.8.17;

// import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/forge-std/src/Test.sol";
import "../src/Wallet.sol";
import "../src/OwnershipNFT.sol";

contract mintTest is Test {
    address public deployer = address(0);
    address public walletMinter1 = address(1);
    address public walletMinter2 = address(2);
    address public walletMinter3 = address(3);

    address public targetContractAddr1 = address(101);

    OwnershipNFT ONFT1;
    OwnershipNFT ONFT2;

    uint256 w1addrUint;
    Wallet w1;
    address w1addr;

    address w2addr;
    address w3addr;

    // setup actions 
    // Action[] actList1;

    function setUp() public {
        vm.prank(deployer);
        ONFT1 = new OwnershipNFT("test1", "TST1");

        vm.prank(walletMinter1);
        w1addrUint = ONFT1.mint();
        w1addr = address(uint160(w1addrUint));
        w1 = Wallet(w1addr);
    }

    function testMintNFT() public {
        assertEq(ONFT1.ownerOf(w1addrUint), walletMinter1);
    }

    function testUseWallet() public {
        Action[] memory actList1 = new Action[](3);
        actList1[0] = Action({targetAddress: targetContractAddr1, encodedCall: '0xc8820f6c000000000000000000000000d47c365127c4c63887fa11d3df89c37a7036926000000000000000000000000000000000000000000000000000a8eac56d395616000000000000000000000000d47c365127c4c63887fa11d3df89c37a70369260'});
        actList1[1] = Action({targetAddress: targetContractAddr1, encodedCall: '0xc8820f6c000000000000000000000000d47c365127c4c63887fa11d3df89c37a7036926000000000000000000000000000000000000000000000000000a8eac56d395616000000000000000000000000d47c365127c4c63887fa11d3df89c37a70369260'});
        actList1[2] = Action({targetAddress: targetContractAddr1, encodedCall: '0xc8820f6c000000000000000000000000d47c365127c4c63887fa11d3df89c37a7036926000000000000000000000000000000000000000000000000000a8eac56d395616000000000000000000000000d47c365127c4c63887fa11d3df89c37a70369260'});
        vm.prank(walletMinter1);
        w1.exec(actList1);
    }

    function testFailUseWallet() public {
        Action[] memory actList1 = new Action[](3);
        actList1[0] = Action({targetAddress: targetContractAddr1, encodedCall: '0xc8820f6c000000000000000000000000d47c365127c4c63887fa11d3df89c37a7036926000000000000000000000000000000000000000000000000000a8eac56d395616000000000000000000000000d47c365127c4c63887fa11d3df89c37a70369260'});
        actList1[1] = Action({targetAddress: targetContractAddr1, encodedCall: '0xc8820f6c000000000000000000000000d47c365127c4c63887fa11d3df89c37a7036926000000000000000000000000000000000000000000000000000a8eac56d395616000000000000000000000000d47c365127c4c63887fa11d3df89c37a70369260'});
        actList1[2] = Action({targetAddress: targetContractAddr1, encodedCall: '0xc8820f6c000000000000000000000000d47c365127c4c63887fa11d3df89c37a7036926000000000000000000000000000000000000000000000000000a8eac56d395616000000000000000000000000d47c365127c4c63887fa11d3df89c37a70369260'});
        vm.prank(walletMinter2);
        w1.exec(actList1);
    }
}
