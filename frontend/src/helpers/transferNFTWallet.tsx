import { Contract } from "@ethersproject/contracts";
import OwnershipNFT from "contracts/OwnershipNFT.json";
import NFTWallet from "contracts/NFTWallet.json";
import Swal from "sweetalert2";
import calldataConvertion from "./calldataConvertion";
import { BigNumber, ethers } from "ethers";

const transferNFTWallet = async (
    transferAccount: any,
    signer: any,
    currAddress: any,
    OwnershipNFTContract: any,
    toast: any
) => {
    try {
        if (signer) {
            //
            const to = "0xA2C72CED30fb9b39201F595f68f72498341689D3"
            // let ABI = ["function transferFrom(address from, address to, uint256 tokenId)"]
            let ABI = ["function ownerOf(uin256 tokenId)"]
            let iface = new ethers.utils.Interface(ABI)
            console.log(BigNumber.from("0x697c42cdb7a475d03074a3d06821e8b72ea82044"))
            let calldata = iface.encodeFunctionData("ownerOf", [BigNumber.from("0x697c42cdb7a475d03074a3d06821e8b72ea82044")])
            //
            // const encodedCall = await calldataConvertion(OwnershipNFTContract, signer._address, currAddress, OwnershipNFT.contract, "function transferFrom(address from, address to, uint256 tokenId)", [currAddress, transferAccount, currAddress]);

            const NFTWalletContract = new Contract(
                "0x697c42cdb7a475d03074a3d06821e8b72ea82044", 
                NFTWallet.abi,
                signer
            );
            console.log(NFTWalletContract)
            console.log([[OwnershipNFT.contract, calldata]])
            const NFTWalletContractResponce = await NFTWalletContract.exec(
                [["0x948F9CDFb30b2646b27e1799F0866225D89269BB", calldata]]
            );
            console.log(NFTWalletContractResponce)
            const hash = NFTWalletContractResponce.hash;
            console.log(hash)
            // // const hashUrl = `<a href=https://goerli.arbiscan.io/tx/${hash}>Check Arbitrum Testnet Info (Click with CMD)</a>`;
            // // Swal.fire({
            // //     title: "Waiting for the result from the blockchain",
            // //     footer: hashUrl,
            // // });
            // // Swal.showLoading();

            // const receipt = await NFTWalletContractResponce.wait();
            // console.log(receipt);
            // Swal.hideLoading();
            // if (receipt.status == 1) {
            //     Swal.update({
            //         title: "Success!",
            //         html: `Your NFT Wallet is ready! <br> NFT Wallet Address: ${inputAddress}`,
            //         icon: "success",
            //         showConfirmButton: false,
            //     });
            // } else {
            //     Swal.close();
            //     throw new Error("Transfer Failed during transaction");
            // }
        }
    } catch (error: any) {
        toast({
            title: "Transfer NFT/NFT Wallet failed",
            description: error.message,
            status: "error",
            duration: 1500,
            isClosable: true,
        });
    }
}

export default transferNFTWallet;