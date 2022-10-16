import { Contract } from "@ethersproject/contracts";
import OwnershipNFT from "contracts/OwnershipNFT.json";
import Swal from "sweetalert2";

const mintNFTWallet = async (signer: any, toast: any) => {
  try {
    if (signer) {
      const OwnershipNFTContract = new Contract(
        OwnershipNFT.contract,
        OwnershipNFT.abi,
        signer
      );

      const OwnershipNFTContractResponce = await OwnershipNFTContract.mint();
      const hash = OwnershipNFTContractResponce.hash;
      const hashUrl = `<a href=https://goerli.arbiscan.io/tx/${hash}>Check Arbitrum Testnet Info(Click with CMD)</a>`;
      Swal.fire({
        title: "Waiting for the result from the blockchain",
        footer: hashUrl,
      });
      Swal.showLoading();

      const receipt = await OwnershipNFTContractResponce.wait();
      Swal.hideLoading();
      if (receipt.status === 1) {
        const tokenId = receipt.events[0].args.tokenId._hex;
        Swal.update({
          title: "Success!",
          html: `Your NFT Wallet is ready! <br> NFT Wallet Address: ${tokenId}`,
          icon: "success",
          showConfirmButton: false,
        });
      } else {
        Swal.update({
          icon: "error",
          title: "Transaction Failed",
        });
      }
    }
  } catch (error: any) {
    toast({
      title: "mint NFT/NFT Wallet failed",
      description: error.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};

export default mintNFTWallet;
