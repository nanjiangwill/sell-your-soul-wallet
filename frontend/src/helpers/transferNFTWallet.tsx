import { Contract } from "@ethersproject/contracts";
import OwnershipNFT from "contracts/OwnershipNFT.json";
import NFTWallet from "contracts/NFTWallet.json";
import Swal from "sweetalert2";
import encodedCallConvertion from "./encodedCallConvertion";
import { BigNumber } from "ethers";

const transferNFTWallet = async (
    signer: any,
    to: any,
    currAddress: any,
    toast: any
) => {
    try {
        if (signer) {
            const OwnershipNFTContract = new Contract(
                OwnershipNFT.contract,
                OwnershipNFT.abi,
                signer
            );
            const from = await OwnershipNFTContract.ownerOf(BigNumber.from(currAddress));

            const calldata:any = await encodedCallConvertion(
                signer,
                currAddress,
                OwnershipNFT.contract,
                "function transferFrom(address from, address to, uint256 tokenId)",
                [from, to, BigNumber.from(currAddress)]
            )
            let NFTWalletInit = calldata[0];
            let actionData = calldata[1];
            const NFTWalletContract = new Contract(
                NFTWalletInit,
                NFTWallet.abi,
                signer
            );
            console.log(NFTWalletInit)
            console.log(actionData)
            const transferResult = await NFTWalletContract.exec(
                actionData
            );
            

        //     const hash = transferResult.hash;
        //     const hashUrl = `<a href=https://goerli.arbiscan.io/tx/${hash}>Check Arbitrum Testnet Info (Click with CMD)</a>`;
        //     Swal.fire({
        //         title: "Waiting for the result from the blockchain",
        //         footer: hashUrl,
        //     });
        //     Swal.showLoading();

        //     const receipt = await transferResult.wait();
        //     Swal.hideLoading();
        //     if (receipt.status == 1) {
        //         Swal.update({
        //             title: "Success!",
        //             html: `Your NFT Wallet is transferred to ${to}`,
        //             icon: "success",
        //             showConfirmButton: false,
        //         });
        //     } else {
        //         Swal.close();
        //         throw new Error("Transfer Failed during transaction");
        //     }
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